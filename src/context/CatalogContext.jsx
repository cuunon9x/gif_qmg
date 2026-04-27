import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || 'https://admin-qmg.onrender.com'
const API_KEY = import.meta.env.VITE_API_KEY || ''

function apiHeaders(extra = {}) {
  return {
    ...(API_KEY ? { 'x-admin-api-key': API_KEY } : {}),
    ...extra,
  }
}

const CatalogContext = createContext(null)

export function CatalogProvider({ children }) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadCatalog() {
    setLoading(true)
    setError('')
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch(`${API_BASE}/api/products`, { headers: apiHeaders() }),
        fetch(`${API_BASE}/api/categories`, { headers: apiHeaders() }),
      ])
      if (!productsRes.ok || !categoriesRes.ok) {
        throw new Error(`Catalog API failed: ${productsRes.status}/${categoriesRes.status}`)
      }
      const [productsJson, categoriesJson] = await Promise.all([
        productsRes.json(),
        categoriesRes.json(),
      ])
      setProducts(Array.isArray(productsJson) ? productsJson : [])
      setCategories(Array.isArray(categoriesJson) ? categoriesJson : [])
    } catch (err) {
      setProducts([])
      setCategories([])
      setError(err.message || 'Failed to load catalog')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCatalog()
  }, [])

  const value = useMemo(
    () => ({ products, categories, loading, error, reloadCatalog: loadCatalog }),
    [products, categories, loading, error],
  )

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
}

export function useCatalog() {
  const ctx = useContext(CatalogContext)
  if (!ctx) throw new Error('useCatalog must be used inside CatalogProvider')
  return ctx
}
