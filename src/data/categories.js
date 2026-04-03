// categories.js – re-exports from categories.json (edited via Admin panel)
import data from './categories.json'

export const CATEGORIES = data

export function getCategoryBySlug(slug) {
  return CATEGORIES.find(c => c.slug === slug)
}
