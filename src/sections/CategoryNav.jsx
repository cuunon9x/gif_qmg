import { Link } from 'react-router-dom'
import useInView from '../hooks/useInView'
import { useCatalog } from '../context/CatalogContext'

const CAT_STYLES = {
  'may-lanh':  { bg: 'from-blue-500 to-cyan-400',    text: 'text-blue-50' },
  'tu-lanh':   { bg: 'from-sky-600 to-blue-400',     text: 'text-sky-50'  },
  'may-giat':  { bg: 'from-indigo-500 to-violet-400', text: 'text-indigo-50' },
  'tivi':      { bg: 'from-gray-700 to-gray-500',     text: 'text-gray-50' },
  'gia-dung':  { bg: 'from-emerald-500 to-teal-400',  text: 'text-emerald-50' },
  'dich-vu':   { bg: 'from-primary to-primary-dark',  text: 'text-white'   },
}
const DEFAULT_STYLE = { bg: 'from-primary to-primary-dark', text: 'text-white' }

export default function CategoryNav() {
  const [ref, inView] = useInView()
  const { categories, subcategories, loading } = useCatalog()

  // Only non-service parent cats + service at end
  const productCats = categories.filter(c => !c.isService).sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
  const serviceCat  = categories.filter(c => c.isService)
  const ordered = [...productCats, ...serviceCat]

  return (
    <section className="py-12 sm:py-16 bg-primary-light">
      <div className="max-w-7xl mx-auto px-4">
        <div ref={ref} className="text-center mb-8 sm:mb-10">
          <span className="text-primary font-semibold text-xs uppercase tracking-widest">Danh Mục</span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-1 text-gray-800">
            Khám Phá Sản Phẩm &amp; Dịch Vụ
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-gray-200 animate-pulse aspect-square" />
            ))}
          </div>
        ) : (
          <div className={`grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 fade-up ${inView ? 'in-view' : ''}`}>
            {ordered.map((cat, i) => {
              const style = CAT_STYLES[cat.slug] || DEFAULT_STYLE
              const subCount = subcategories.filter(s => s.parentSlug === cat.slug).length
              return (
                <Link
                  key={cat.slug}
                  to={`/${cat.slug}`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                  className={`group flex flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br ${style.bg} ${style.text}
                    p-4 sm:p-5 aspect-square shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center`}
                >
                  <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300 leading-none">
                    {cat.icon || '📦'}
                  </span>
                  <h3 className="font-bold text-xs sm:text-sm leading-tight line-clamp-2">{cat.label}</h3>
                  {subCount > 0 && (
                    <span className="text-[10px] sm:text-xs opacity-75 hidden sm:block">
                      {subCount} thương hiệu
                    </span>
                  )}
                  {cat.isService && (
                    <span className="text-[10px] sm:text-xs opacity-75 hidden sm:block">Tư vấn miễn phí</span>
                  )}
                </Link>
              )
            })}
          </div>
        )}

        {/* Brand chips row (mobile-friendly horizontal scroll) */}
        {/* {!loading && (
          <div className="mt-6 sm:mt-8 overflow-x-auto pb-1 -mx-4 px-4">
            <div className="flex gap-2 w-max">
              {subcategories
                .filter(s => s.parentSlug === 'may-lanh')
                .map(sub => (
                  <Link
                    key={sub.slug}
                    to={`/${sub.slug}`}
                    className="shrink-0 px-3 py-1.5 bg-white rounded-full text-xs font-semibold text-gray-700 shadow-sm hover:bg-primary hover:text-white transition-colors border border-gray-100"
                  >
                    {sub.label}
                  </Link>
                ))}
            </div>
          </div>
        )} */}
      </div>
    </section>
  )
}
