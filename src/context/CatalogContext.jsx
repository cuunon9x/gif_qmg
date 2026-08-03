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
  const [subcategories, setSubcategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadCatalog() {
    setLoading(true)
    setError('')
    try {
      const [productsRes, categoriesRes, subcatsRes] = await Promise.all([
        fetch(`${API_BASE}/api/products`, { headers: apiHeaders() }),
        fetch(`${API_BASE}/api/categories`, { headers: apiHeaders() }),
        fetch(`${API_BASE}/api/subcategories`, { headers: apiHeaders() }),
      ])
      if (!productsRes.ok || !categoriesRes.ok) {
        throw new Error(`Catalog API failed: ${productsRes.status}/${categoriesRes.status}`)
      }
      const [productsJson, categoriesJson, subcatsJson] = await Promise.all([
        productsRes.json(),
        categoriesRes.json(),
        subcatsRes.ok ? subcatsRes.json() : Promise.resolve([]),
      ])
      setProducts(Array.isArray(productsJson) ? productsJson : [])
      setCategories(Array.isArray(categoriesJson) ? categoriesJson : [])
      setSubcategories(Array.isArray(subcatsJson) ? subcatsJson : [])
    } catch (err) {
      setProducts([])
      setCategories([])
      setSubcategories([])
      setError(err.message || 'Failed to load catalog')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCatalog()
  }, [])

  const value = useMemo(
    () => ({ products, categories, subcategories, loading, error, reloadCatalog: loadCatalog }),
    [products, categories, subcategories, loading, error],
  )

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
}

export function useCatalog() {
  const ctx = useContext(CatalogContext)
  if (!ctx) throw new Error('useCatalog must be used inside CatalogProvider')
  return ctx
}
