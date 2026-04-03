import useInView from '../hooks/useInView'

const PARTNERS = [
  { name: 'Vingroup',      logo: '/logos/vingroup.svg' },
  { name: 'Masan Group',   logo: '/logos/masan.svg' },
  { name: 'Techcombank',   logo: '/logos/techcombank.svg' },
  { name: 'Vinamilk',      logo: '/logos/vinamilk.svg' },
  { name: 'VNG Corp',      logo: '/logos/vng.svg' },
  { name: 'PNJ',           logo: '/logos/pnj.svg' },
  { name: 'Grab',          logo: '/logos/grab.svg' },
  { name: 'Shopee',        logo: '/logos/shopee.svg' },
  { name: 'Tiki',          logo: '/logos/tiki.svg' },
  { name: 'Be Group',      logo: '/logos/be.svg' },
  { name: 'VinFast',       logo: '/logos/vinfast.svg' },
  { name: 'MoMo',          logo: '/logos/momo.svg' },
  { name: 'ViettelPay',    logo: '/logos/viettelpay.svg' },
  { name: 'Vietcombank',   logo: '/logos/vietcombank.svg' },
  { name: 'BIDV',          logo: '/logos/bidv.svg' },
]

// Duplicate for seamless infinite loop
const TRACK = [...PARTNERS, ...PARTNERS]

function LogoCard({ name, logo }) {
  return (
    <div className="shrink-0 mx-3 w-40 h-16 bg-white border border-gray-100 rounded-xl flex items-center justify-center px-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <img
        src={logo}
        alt={name}
        title={name}
        className="max-h-10 w-full object-contain"
        loading="lazy"
      />
    </div>
  )
}

export default function Partners() {
  const [ref, inView] = useInView()

  return (
    <section className="py-14 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div ref={ref} className={`text-center mb-8 fade-up ${inView ? 'in-view' : ''}`}>
          <span className="text-primary font-semibold text-xs uppercase tracking-widest">Đối Tác</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-1 text-gray-800">500+ Doanh Nghiệp Đã Tin Dùng</h2>
        </div>

        {/* Marquee */}
        <div className="overflow-hidden">
          <div className="marquee-track">
            {TRACK.map((p, i) => (
              <LogoCard key={i} name={p.name} logo={p.logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

