import ProductCard from '../components/ProductCard'
import useInView from '../hooks/useInView'
import { useCatalog } from '../context/CatalogContext'

export default function FeaturedProducts() {
  const [headRef, headIn] = useInView()
  const [gridRef, gridIn] = useInView()
  const { products, loading } = useCatalog()
  const featuredProducts = products.filter(p => p.featured)

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div ref={headRef} className={`text-center mb-10 fade-up ${headIn ? 'in-view' : ''}`}>
          <span className="text-primary font-semibold text-xs uppercase tracking-widest">Sản phẩm nổi bật</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-1 text-gray-800">Gợi ý từ QMG</h2>
          <p className="text-gray-500 text-sm mt-2 max-w-lg mx-auto">
            Danh mục nổi bật: Quà Tặng Sức Khỏe, Quà Tặng Doanh Nghiệp — chọn mẫu phù hợp chiến dịch của bạn.
          </p>
        </div>

        <div ref={gridRef} className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 fade-up ${gridIn ? 'in-view' : ''}`}>
          {!loading && featuredProducts.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              className=""
              style={{ transitionDelay: `${i * 60}ms` }}
            />
          ))}
          {loading && <p className="col-span-full text-center text-sm text-gray-500">Đang tải sản phẩm...</p>}
        </div>
      </div>
    </section>
  )
}
