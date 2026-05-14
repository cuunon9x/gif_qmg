import { Navigate, useParams } from 'react-router-dom'
import { useCatalog } from '../context/CatalogContext'
import CategoryPage from './CategoryPage'
import ServicePage from './ServicePage'

export default function CategoryOrService() {
  const { category } = useParams()
  const { categories, loading } = useCatalog()

  if (loading) {
    return (
      <main className="flex min-h-[40vh] items-center justify-center pt-24 text-sm text-gray-500">
        Đang tải danh mục...
      </main>
    )
  }

  const cat = categories.find((c) => c.slug === category)
  if (!cat) {
    return <Navigate to="/" replace />
  }
  if (cat.isService) {
    return <ServicePage />
  }
  return <CategoryPage category={category} />
}
