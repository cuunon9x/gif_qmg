import useInView from '../hooks/useInView'

const BASE = '/gif_qmg';
const PARTNERS = [
  { name: 'Vingroup',      logo: `${BASE}/logos/vingroup.svg` },
  { name: 'Masan Group',   logo: `${BASE}/logos/masan.svg` },
  { name: 'Techcombank',   logo: `${BASE}/logos/techcombank.svg` },
  { name: 'Vinamilk',      logo: `${BASE}/logos/vinamilk.svg` },
  { name: 'VNG Corp',      logo: `${BASE}/logos/vng.svg` },
  { name: 'PNJ',           logo: `${BASE}/logos/pnj.svg` },
  { name: 'Grab',          logo: `${BASE}/logos/grab.svg` },
  { name: 'Shopee',        logo: `${BASE}/logos/shopee.svg` },
  { name: 'Tiki',          logo: `${BASE}/logos/tiki.svg` },
  { name: 'Be Group',      logo: `${BASE}/logos/be.svg` },
  { name: 'VinFast',       logo: `${BASE}/logos/vinfast.svg` },
  { name: 'MoMo',          logo: `${BASE}/logos/momo.svg` },
  { name: 'ViettelPay',    logo: `${BASE}/logos/viettelpay.svg` },
  { name: 'Vietcombank',   logo: `${BASE}/logos/vietcombank.svg` },
  { name: 'BIDV',          logo: `${BASE}/logos/bidv.svg` }
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

