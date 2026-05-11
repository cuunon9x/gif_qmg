import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const bannerModules = import.meta.glob('../assets/banner/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})

const BANNER_URLS = Object.keys(bannerModules)
  .sort((a, b) => a.localeCompare(b))
  .map((path) => bannerModules[path])

const SLIDE_META = [
  {
    tag: 'Quà Tặng Doanh Nghiệp',
    title: 'Sang Trọng Trong\nTừng Món Quà',
    sub: 'Thiết kế riêng theo thương hiệu doanh nghiệp – miễn phí thiết kế – giao hàng toàn quốc.',
    cta: { label: 'Xem Quà Doanh Nghiệp', to: '/qua-tang-doanh-nghiep' },
  },
  {
    tag: 'Quà Tặng Sức Khỏe',
    title: 'Quà Tặng Sống Khỏe\nCho Doanh Nghiệp',
    sub: 'Granola, ngũ cốc và thực phẩm dinh dưỡng phù hợp cho nhân sự, đối tác và các chiến dịch chăm sóc sức khỏe.',
    cta: { label: 'Xem Quà Sức Khỏe', to: '/qua-tang-suc-khoe' },
  },
]

const SLIDES = SLIDE_META.map((meta, i) => ({
  ...meta,
  image: BANNER_URLS.length ? BANNER_URLS[i % BANNER_URLS.length] : '',
}))

const STATS = [
  { value: '20+', label: 'Doanh nghiệp tin dùng' },
  { value: '1.000+', label: 'Hộp quà đã giao' },
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
    <section className="relative isolate w-full overflow-hidden bg-gray-900 pt-[72px]">
      {/* Full-bleed banner: width = viewport; height follows content block below */}
      <div className="relative w-full min-h-[84vh]">
        <div className="absolute inset-0 overflow-hidden">
          {SLIDES.map((s, i) => (
            <div key={i} className={`slide ${i === current ? 'active' : ''}`}>
              <img src={s.image} alt={s.tag} className="h-full w-full object-cover object-center" />
            </div>
          ))}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-14 lg:px-10">
          <div key={current} className="max-w-xl">
            <span className="hero-badge inline-block bg-primary/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4 tracking-wide">
              {slide.tag}
            </span>
            <h1 className="hero-title text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl lg:text-5xl mb-4 sm:mb-5 whitespace-pre-line">
              {slide.title}
            </h1>
            <p className="hero-sub max-w-md text-sm leading-relaxed text-gray-200 sm:text-base md:text-lg mb-6 sm:mb-8">
              {slide.sub}
            </p>
            <div className="hero-cta flex flex-wrap gap-3">
              <Link
                to={slide.cta.to}
                onClick={() => setUserInteracted(true)}
                className="btn-glow rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-colors hover:bg-primary-dark sm:px-7 sm:py-3"
              >
                {slide.cta.label}
              </Link>
              <a
                href="tel:0938777888"
                onClick={() => setUserInteracted(true)}
                className="rounded-full border border-white/30 bg-white/15 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/25 sm:px-7 sm:py-3"
              >
                Liên hệ tư vấn
              </a>
            </div>

            <div className="mt-4 max-w-lg text-[11px] leading-relaxed text-gray-200/90 sm:mt-6 sm:text-[12px]">
              <span className="font-semibold text-white">MST:</span> 3703185328 <span className="mx-2 text-white/30">•</span>
              Bình Dương <span className="mx-2 text-white/30">•</span>
              Phản hồi 5–15 phút (7h30–17h) <span className="mx-2 text-white/30">•</span>
              Thiết kế & in logo theo nhận diện
            </div>
          </div>

          <div className="mt-6 flex gap-2 sm:mt-8">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { setCurrent(i); setUserInteracted(true) }}
                className={`rounded-full transition-all ${i === current ? 'h-2 w-8 bg-primary' : 'h-2 w-2 bg-white/50'}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-20 w-full border-t border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-4 sm:gap-4 sm:px-6 sm:py-5 md:grid-cols-4 md:px-8 lg:px-10">
          {STATS.map(s => (
            <div key={s.label} className="stat-pop text-center">
              <div className="text-xl font-extrabold text-primary sm:text-2xl">{s.value}</div>
              <div className="mt-0.5 text-[11px] text-gray-300 sm:text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
