import useInView from '../hooks/useInView'
import partners from '../data/partners.json'

const logoModules = import.meta.glob('../assets/partners/*', { eager: true, import: 'default' })

/** Resolve bundled URL by filename (case-insensitive match on disk basename). */
function logoUrlForFile(filename) {
  if (!filename) return null
  const want = filename.toLowerCase()
  for (const path of Object.keys(logoModules)) {
    const base = path.replace(/^.*[/\\]/, '')
    if (base.toLowerCase() === want) return logoModules[path]
  }
  return null
}

export default function Partners() {
  const [ref, inView] = useInView()

  return (
    <section className="py-14 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div ref={ref} className={`text-center mb-10 fade-up ${inView ? 'in-view' : ''}`}>
          <span className="text-primary font-semibold text-xs uppercase tracking-widest">Khách hàng & đối tác</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-1 text-gray-800">Đối tác tiêu biểu</h2>
          <p className="text-gray-500 text-sm mt-3 leading-relaxed max-w-2xl mx-auto">
            QMG vinh dự được đồng hành cùng nhiều tổ chức, ngân hàng và doanh nghiệp uy tín.
          </p>
        </div>

        <ul
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 fade-up ${inView ? 'in-view' : ''}`}
          aria-label="Danh sách đối tác"
        >
          {partners.map((p, i) => {
            const src = logoUrlForFile(p.logo)
            return (
              <li
                key={`${p.name}-${i}`}
                className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white px-3 py-4 sm:py-5 text-center shadow-sm hover:border-primary/40 transition-colors min-h-[100px]"
                style={{ transitionDelay: `${(i % 8) * 35}ms` }}
              >
                {src ? (
                  <img
                    src={src}
                    alt={p.name}
                    className="max-h-12 sm:max-h-14 w-full object-contain object-center"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span className="font-bold text-gray-800 text-sm">{p.name}</span>
                )}
                {p.note ? (
                  <span className="text-[10px] sm:text-xs text-gray-500 mt-2 leading-snug line-clamp-2">{p.note}</span>
                ) : null}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
