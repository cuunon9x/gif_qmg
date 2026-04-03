// products.js – re-exports from products.json (edited via Admin panel or directly)
import data from './products.json'

export const PRODUCTS = data

export function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.featured)
}

export function getProductsByCategory(category) {
  return PRODUCTS.filter(p => p.category === category)
}

export function getProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug)
}

export function getRelatedProducts(product, limit = 4) {
  return PRODUCTS.filter(p => p.category === product.category && p.slug !== product.slug).slice(0, limit)
}
