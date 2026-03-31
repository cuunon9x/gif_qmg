import { Link } from 'react-router-dom'
import { CATEGORIES } from '../data/categories'
import useInView from '../hooks/useInView'

export default function CategoryNav() {
  const [ref, inView] = useInView()

  return (
    <section className="py-14 bg-primary-light">
      <div className="max-w-7xl mx-auto px-4">
        <div ref={ref} className="text-center mb-10">
          <span className="text-primary font-semibold text-xs uppercase tracking-widest">Danh Mục</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-1 text-gray-800">Khám Phá Bộ Sưu Tập Quà Tặng</h2>
        </div>

        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-5 fade-up ${inView ? 'in-view' : ''}`}>
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.slug}
              to={cat.isService ? '/thiet-ke-rieng' : `/${cat.slug}`}
              style={{ transitionDelay: `${i * 80}ms` }}
              className="icon-bounce group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <img src={cat.image} alt={cat.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-60 group-hover:opacity-75 transition-opacity`} />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                <span className="cat-icon text-3xl mb-2">{cat.icon}</span>
                <h3 className="font-bold text-base leading-tight">{cat.label}</h3>
                {cat.count && <p className="text-xs mt-1 opacity-80">{cat.count} sản phẩm</p>}
                {cat.isService && <p className="text-xs mt-1 opacity-80">Miễn phí thiết kế</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
