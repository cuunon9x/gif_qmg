import { Navigate, useParams } from 'react-router-dom'
import { useCatalog } from '../context/CatalogContext'
import CategoryPage from './CategoryPage'
import ServicePage from './ServicePage'

export default function CategoryOrService() {
  const { category } = useParams()
  const { categories, subcategories, loading } = useCatalog()

  if (loading) {
    return (
      <main className="flex min-h-[40vh] items-center justify-center pt-24 text-sm text-gray-500">
        Đang tải danh mục...
      </main>
    )
  }

  // Check service first
  const serviceCat = categories.find((c) => c.isService && c.slug === category)
  if (serviceCat) return <ServicePage />

  // Check if it's a parent category
  const parentCat = categories.find((c) => !c.isService && c.slug === category)
  if (parentCat) {
    // Collect all subcategory slugs under this parent
    const childSlugs = subcategories
      .filter((s) => s.parentSlug === category)
      .map((s) => s.slug)
    return <CategoryPage category={category} childSlugs={childSlugs} parentCat={parentCat} />
  }

  // Check if it's a subcategory (brand) slug
  const subCat = subcategories.find((s) => s.slug === category)
  if (subCat) {
    return <CategoryPage category={category} subCat={subCat} />
  }

  return <Navigate to="/" replace />
}
