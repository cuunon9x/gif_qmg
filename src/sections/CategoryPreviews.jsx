import { Link } from 'react-router-dom'
import { CATEGORIES } from '../data/categories'
import { getProductsByCategory } from '../data/products'
import ProductCard from '../components/ProductCard'
import useInView from '../hooks/useInView'

function CategorySection({ cat }) {
  const [ref, inView] = useInView()
  const products = getProductsByCategory(cat.slug).slice(0, 4)
  if (products.length === 0) return null

  return (
    <div ref={ref} className={`fade-up ${inView ? 'in-view' : ''}`}>
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="text-2xl mr-2">{cat.icon}</span>
          <h3 className="inline text-xl font-bold text-gray-800">{cat.label}</h3>
          <p className="text-gray-500 text-sm mt-1">{cat.description}</p>
        </div>
        <Link
          to={`/${cat.slug}`}
          className="shrink-0 text-primary text-sm font-semibold hover:underline whitespace-nowrap ml-4"
        >
          Xem tất cả →
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}

export default function CategoryPreviews() {
  const cats = CATEGORIES.filter(c => !c.isService)

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 flex flex-col gap-16">
        {cats.map(cat => (
          <CategorySection key={cat.slug} cat={cat} />
        ))}
      </div>
    </section>
  )
}
