import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'qmg_cart'

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(i => i.slug === action.product.slug)
      if (existing) {
        return state.map(i =>
          i.slug === action.product.slug
            ? { ...i, qty: i.qty + (action.qty || 1) }
            : i
        )
      }
      return [...state, { ...action.product, qty: action.qty || 1 }]
    }
    case 'REMOVE':
      return state.filter(i => i.slug !== action.slug)
    case 'UPDATE_QTY':
      if (action.qty <= 0) return state.filter(i => i.slug !== action.slug)
      return state.map(i => i.slug === action.slug ? { ...i, qty: action.qty } : i)
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
  const remove = (slug) => dispatch({ type: 'REMOVE', slug })
  const updateQty = (slug, qty) => dispatch({ type: 'UPDATE_QTY', slug, qty })
  const clear = () => dispatch({ type: 'CLEAR' })

  return (
    <CartContext.Provider value={{ items, totalQty, totalPrice, formatVND, add, remove, updateQty, clear }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
