import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'qmg_cart'

function buildCartKey({ slug, variantId }) {
  return `${slug || ''}::${variantId || ''}`
}

function clampQtyForItem(item, qty) {
  const n = Number(qty) || 0
  const min = Math.max(0, n)
  const stock = Number.isFinite(Number(item?.variantStock)) ? Number(item.variantStock) : null
  if (stock === null) return min
  return Math.min(min, Math.max(stock, 0))
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const key = action.product?.cartKey || buildCartKey(action.product || {})
      const existing = state.find(i => i.cartKey === key)
      if (existing) {
        return state.map(i =>
          i.cartKey === key
            ? { ...i, qty: clampQtyForItem(i, i.qty + (action.qty || 1)) }
            : i
        )
      }
      const next = { ...action.product, cartKey: key, qty: action.qty || 1 }
      return [...state, { ...next, qty: clampQtyForItem(next, next.qty) }]
    }
    case 'REMOVE':
      return state.filter(i => i.cartKey !== action.cartKey)
    case 'UPDATE_QTY':
      if (action.qty <= 0) return state.filter(i => i.cartKey !== action.cartKey)
      return state.map(i => i.cartKey === action.cartKey ? { ...i, qty: clampQtyForItem(i, action.qty) } : i)
    case 'CLEAR':
      return []
    case 'LOAD':
      return action.items
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [])

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      if (saved.length) dispatch({ type: 'LOAD', items: saved })
    } catch {}
  }, [])

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const totalQty = items.reduce((sum, i) => sum + i.qty, 0)
  const totalPrice = items.reduce((sum, i) => {
    const price = typeof i.priceNum === 'number' ? i.priceNum : 0
    return sum + price * i.qty
  }, 0)

  function formatVND(n) {
    return n.toLocaleString('vi-VN') + ' ₫'
  }

  const add = (product, qty = 1) => dispatch({ type: 'ADD', product, qty })
  const remove = (cartKey) => dispatch({ type: 'REMOVE', cartKey })
  const updateQty = (cartKey, qty) => dispatch({ type: 'UPDATE_QTY', cartKey, qty })
  const clear = () => dispatch({ type: 'CLEAR' })

  return (
    <CartContext.Provider value={{ items, totalQty, totalPrice, formatVND, add, remove, updateQty, clear, buildCartKey }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
