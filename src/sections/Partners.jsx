import useInView from '../hooks/useInView'
import partners from '../data/partners.json'

const logoModules = import.meta.glob('../assets/partners/*', { eager: true, import: 'default' })

function logoUrlForFile(filename) {
  if (!filename) return null
  const want = filename.toLowerCase()
  for (const path of Object.keys(logoModules)) {
    const base = path.replace(/^.*[/\\]/, '')
    if (base.toLowerCase() === want) return logoModules[path]
  }
  return null
}

function PartnerLogo({ p }) {
  const src = logoUrlForFile(p.logo)
  return (
    <div className="flex h-14 sm:h-16 w-[7.5rem] sm:w-36 shrink-0 items-center justify-center px-2">
      {src ? (
        <img
          src={src}
          alt=""
          className="max-h-11 sm:max-h-14 w-full object-contain object-center opacity-90 hover:opacity-100 transition-opacity"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="text-xs font-semibold text-gray-600 text-center leading-tight">{p.name}</span>
      )}
    </div>
  )
}

function LogoStrip({ dupKey, ariaHidden }) {
  return (
    <div
      className="flex shrink-0 items-center gap-6 sm:gap-10 md:gap-12 px-4 sm:px-8"
      aria-hidden={ariaHidden ? true : undefined}
    >
      {partners.map(p => (
        <PartnerLogo key={`${dupKey}-${p.name}`} p={p} />
      ))}
    </div>
  )
}

export default function Partners() {
  const [ref, inView] = useInView()

  return (
    <section className="py-14 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div ref={ref} className={`text-center mb-8 fade-up ${inView ? 'in-view' : ''}`}>
          <span className="text-primary font-semibold text-xs uppercase tracking-widest">Khách hàng & đối tác</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-1 text-gray-800">Đối tác tiêu biểu</h2>
          <p className="text-gray-500 text-sm mt-3 leading-relaxed max-w-2xl mx-auto">
            QMG vinh dự được đồng hành cùng nhiều tổ chức, ngân hàng và doanh nghiệp uy tín.
          </p>
        </div>
      </div>

      <div
        className="relative w-full overflow-hidden py-2"
        role="region"
        aria-label="Logo đối tác, cuộn ngang"
      >
        <div className="partners-marquee-track">
          <LogoStrip dupKey="a" />
          <LogoStrip dupKey="b" ariaHidden />
        </div>
      </div>

      <p className="sr-only">{partners.map(p => p.name).join(', ')}</p>
    </section>
  )
}
