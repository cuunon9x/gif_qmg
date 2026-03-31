import { getFeaturedProducts } from '../data/products'
import ProductCard from '../components/ProductCard'
import useInView from '../hooks/useInView'

export default function FeaturedProducts() {
  const [headRef, headIn] = useInView()
  const [gridRef, gridIn] = useInView()
  const products = getFeaturedProducts()

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div ref={headRef} className={`text-center mb-10 fade-up ${headIn ? 'in-view' : ''}`}>
          <span className="text-primary font-semibold text-xs uppercase tracking-widest">Nổi Bật</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-1 text-gray-800">Sản Phẩm Được Yêu Thích Nhất</h2>
          <p className="text-gray-500 text-sm mt-2 max-w-lg mx-auto">
            Được hơn 500 doanh nghiệp tin chọn – từ start-up đến tập đoàn lớn.
          </p>
        </div>

        <div ref={gridRef} className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 fade-up ${gridIn ? 'in-view' : ''}`}>
          {products.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              className=""
              style={{ transitionDelay: `${i * 60}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
