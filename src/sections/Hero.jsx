import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1600&q=80',
    tag: 'Quà Tặng Doanh Nghiệp',
    title: 'Sang Trọng Trong\nTừng Món Quà',
    sub: 'Thiết kế riêng theo thương hiệu doanh nghiệp – miễn phí thiết kế – giao hàng toàn quốc.',
    cta: { label: 'Xem Quà Doanh Nghiệp', to: '/qua-tang-doanh-nghiep' },
  },
  {
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1600&q=80',
    tag: 'Quà Tặng Sức Khỏe',
    title: 'Quà Tặng Sống Khỏe\nCho Doanh Nghiệp',
    sub: 'Granola, ngũ cốc và thực phẩm dinh dưỡng phù hợp cho nhân sự, đối tác và các chiến dịch chăm sóc sức khỏe.',
    cta: { label: 'Xem Quà Sức Khỏe', to: '/qua-tang-suc-khoe' },
  },
]

const STATS = [
  { value: '500+', label: 'Doanh nghiệp tin dùng' },
  { value: '10.000+', label: 'Hộp quà đã giao' },
  { value: '100%', label: 'Miễn phí thiết kế' },
  { value: '24h', label: 'Phản hồi tư vấn' },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [userInteracted, setUserInteracted] = useState(false)

  const reducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches || false
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    if (userInteracted) return
    const timer = setInterval(() => setCurrent(i => (i + 1) % SLIDES.length), 9000)
    return () => clearInterval(timer)
  }, [reducedMotion, userInteracted])

  const slide = SLIDES[current]

  return (
    <section className="relative w-full min-h-screen flex flex-col" style={{ paddingTop: '72px' }}>
      {/* Background slides */}
      <div className="absolute inset-0 overflow-hidden">
        {SLIDES.map((s, i) => (
          <div key={i} className={`slide ${i === current ? 'active' : ''}`}>
            <img src={s.image} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-16 py-20">
        <div key={current} className="max-w-xl">
          <span className="hero-badge inline-block bg-primary/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4 tracking-wide">
            {slide.tag}
          </span>
          <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5 whitespace-pre-line">
            {slide.title}
          </h1>
          <p className="hero-sub text-gray-200 text-base md:text-lg leading-relaxed mb-8 max-w-md">
            {slide.sub}
          </p>
          <div className="hero-cta flex flex-wrap gap-3">
            <Link
              to={slide.cta.to}
              onClick={() => setUserInteracted(true)}
              className="btn-glow bg-primary text-white font-bold px-7 py-3 rounded-full hover:bg-primary-dark transition-colors text-sm shadow-lg"
            >
              {slide.cta.label}
            </Link>
            <a
              href="tel:0938777888"
              onClick={() => setUserInteracted(true)}
              className="bg-white/15 backdrop-blur-sm border border-white/30 text-white font-semibold px-7 py-3 rounded-full hover:bg-white/25 transition-colors text-sm"
            >
              Liên hệ tư vấn
            </a>
          </div>

          {/* Trust bar */}
          <div className="mt-6 text-[12px] text-gray-200/90 leading-relaxed max-w-lg">
            <span className="font-semibold text-white">MST:</span> 3703185328 <span className="mx-2 text-white/30">•</span>
            Bình Dương <span className="mx-2 text-white/30">•</span>
            Phản hồi 5–15 phút (7h30–17h) <span className="mx-2 text-white/30">•</span>
            Thiết kế & in logo theo nhận diện
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex gap-2 mt-10">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setUserInteracted(true) }}
              className={`rounded-full transition-all ${i === current ? 'w-8 h-2 bg-primary' : 'w-2 h-2 bg-white/50'}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative bg-black/40 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(s => (
            <div key={s.label} className="stat-pop text-center">
              <div className="text-2xl font-extrabold text-primary">{s.value}</div>
              <div className="text-xs text-gray-300 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
