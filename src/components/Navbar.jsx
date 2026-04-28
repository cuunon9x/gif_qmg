import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useCatalog } from '../context/CatalogContext'

export default function Navbar({ onCartOpen }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const { totalQty } = useCart()
  const { categories } = useCatalog()
  const navLinks = [
    { label: 'Trang Chủ', to: '/' },
    ...categories.filter(c => !c.isService).map(c => ({ label: c.label, to: `/${c.slug}` })),
    { label: 'Thiết Kế Riêng', to: '/thiet-ke-rieng' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'}`}>
      {/* Top bar */}
      <div className="bg-primary text-white text-xs py-1.5 px-4 hidden sm:flex items-center justify-between max-w-7xl mx-auto">
        <span>🎁 Thiết kế riêng miễn phí – Giao hàng toàn quốc</span>
        <a href="tel:0938777888" className="font-semibold hover:text-primary-light transition-colors">
          📞 Hotline: 0938 777 888 - 0976 926 868
        </a>
      </div>

      <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">QMG</div>
          <div className="leading-tight">
            <div className="font-bold text-gray-900 text-base leading-none">QMG Gift</div>
            <div className="text-[10px] text-primary font-medium tracking-wide">Quà Tặng Doanh Nghiệp</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-primary-light hover:text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA + cart + hamburger */}
        <div className="flex items-center gap-2">
          <a
            href="tel:0938777888"
            className="hidden sm:inline-flex items-center gap-1.5 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-primary-dark transition-colors"
          >
            <span>📞</span> Tư Vấn Ngay
          </a>
          {/* Cart button */}
          <button
            onClick={onCartOpen}
            className="relative p-2 rounded-full text-gray-700 hover:bg-primary-light transition-colors"
            aria-label="Giỏ hàng"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalQty > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-white text-[10px] font-extrabold rounded-full flex items-center justify-center">
                {totalQty > 99 ? '99+' : totalQty}
              </span>
            )}
          </button>
          <button
            onClick={() => setOpen(v => !v)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-primary-light'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href="tel:0938777888"
            className="mt-2 flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-full font-bold text-sm"
          >
            📞 Gọi Tư Vấn Ngay
          </a>
        </div>
      </div>
    </header>
  )
}
