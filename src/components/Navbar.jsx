import { useState, useEffect, useMemo, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useCatalog } from '../context/CatalogContext'
import BrandLockup from './BrandLockup'

export default function Navbar({ onCartOpen }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [hoveredCat, setHoveredCat] = useState(null)
  const [openMobile, setOpenMobile] = useState(null)     // slug of open mobile accordion
  const { pathname } = useLocation()
  const { totalQty } = useCart()
  const { categories, subcategories } = useCatalog()
  const megaRef = useRef(null)

  // Build nav: parent product cats + service cat + static links
  const productCats = useMemo(
    () => categories.filter((c) => !c.isService).sort((a, b) => (a.order ?? 99) - (b.order ?? 99)),
    [categories],
  )
  const serviceCat = useMemo(() => categories.find((c) => c.isService), [categories])

  const staticLinks = [{ label: 'Giới Thiệu', to: '/gioi-thieu' }]

  const policyLinks = [
    { label: 'Chính sách mua hàng', to: '/chinh-sach-mua-hang' },
    { label: 'Chính sách bảo mật', to: '/chinh-sach-bao-mat' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false); setMegaOpen(false) }, [pathname])

  // Close mega when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (megaRef.current && !megaRef.current.contains(e.target)) {
        setMegaOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function subsFor(parentSlug) {
    return subcategories.filter((s) => s.parentSlug === parentSlug)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'}`}>
      {/* Top bar */}
      <div className="bg-primary text-white text-xs py-1.5 px-4 hidden sm:flex items-center justify-between max-w-7xl mx-auto">
        <span>Cung cấp, lắp đặt, bảo trì điện lạnh HVAC – Phục vụ tận nơi</span>
        <div className="flex items-center gap-4">
          {policyLinks.map(link => (
            <NavLink key={link.to} to={link.to}
              className={({ isActive }) =>
                `hover:text-yellow-200 transition-colors ${
                  isActive ? 'text-yellow-300 font-semibold' : 'text-white/80'
                }`
              }>
              {link.label}
            </NavLink>
          ))}
          <a href="tel:0938777888" className="font-semibold hover:text-primary-light transition-colors">
            Hotline: 0938 777 888
          </a>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <BrandLockup />

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {/* Trang Chủ */}
          <NavLink to="/" end
            className={({ isActive }) =>
              `px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-primary-light hover:text-primary'
              }`
            }
          >
            Trang Chủ
          </NavLink>

          {/* DANH MỤC megamenu */}
          <div
            ref={megaRef}
            className="relative"
            onMouseEnter={() => { setMegaOpen(true); setHoveredCat(productCats[0]?.slug ?? null) }}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <button
              type="button"
              onClick={() => setMegaOpen(v => !v)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-primary text-white hover:bg-primary-dark transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Danh Mục
              <svg className={`w-3 h-3 transition-transform ${megaOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {megaOpen && (
              <div className="absolute top-full left-0 mt-1 flex bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden min-w-[480px]">
                {/* Left: parent categories list */}
                <div className="w-52 bg-gray-50 border-r border-gray-100 py-2 flex-shrink-0">
                  {productCats.map((cat) => (
                    <div
                      key={cat.slug}
                      onMouseEnter={() => setHoveredCat(cat.slug)}
                    >
                      <Link
                        to={`/${cat.slug}`}
                        className={`flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                          hoveredCat === cat.slug
                            ? 'bg-primary text-white font-semibold'
                            : 'text-gray-700 hover:bg-primary-light hover:text-primary'
                        }`}
                      >
                        <span>
                          {cat.icon && <span className="mr-2">{cat.icon}</span>}
                          {cat.label}
                        </span>
                        {subsFor(cat.slug).length > 0 && (
                          <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </Link>
                    </div>
                  ))}
                  {serviceCat && (
                    <Link
                      to={`/${serviceCat.slug}`}
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-light hover:text-primary border-t border-gray-200 mt-1 transition-colors"
                    >
                      {serviceCat.icon && <span className="mr-2">{serviceCat.icon}</span>}
                      {serviceCat.label}
                    </Link>
                  )}
                </div>

                {/* Right: subcategories panel */}
                <div className="flex-1 py-4 px-4 min-w-[220px]">
                  {hoveredCat && (() => {
                    const parentCat = productCats.find(c => c.slug === hoveredCat)
                    const subs = subsFor(hoveredCat)
                    return (
                      <>
                        <div className="text-xs font-bold text-primary uppercase tracking-wide mb-3 pb-2 border-b border-gray-100">
                          {parentCat?.icon} {parentCat?.label}
                        </div>
                        <div className="grid grid-cols-1 gap-0.5">
                          <Link
                            to={`/${hoveredCat}`}
                            className="px-3 py-2 text-sm font-semibold text-primary hover:bg-primary-light rounded-lg transition-colors"
                          >
                            Tất cả {parentCat?.label}
                          </Link>
                          {subs.map((sub) => (
                            <Link
                              key={sub.slug}
                              to={`/${sub.slug}`}
                              className="px-3 py-1.5 text-sm text-gray-700 hover:bg-primary-light hover:text-primary rounded-lg transition-colors"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </>
                    )
                  })()}
                </div>
              </div>
            )}
          </div>

          {/* Static links */}
          {staticLinks.map((link) => (
            <NavLink key={link.to} to={link.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-primary-light hover:text-primary'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* CTA + cart + hamburger */}
        <div className="flex items-center gap-2">
          <a
            href="tel:0938777888"
            className="hidden sm:inline-flex items-center gap-1.5 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-primary-dark transition-colors"
          >
            Nhận báo giá miễn phí
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
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-[80vh] overflow-y-auto opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-1">
          {/* Trang chủ */}
          <NavLink to="/" end
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-primary-light'
              }`
            }
          >
            Trang Chủ
          </NavLink>

          {/* Product categories with accordion */}
          {productCats.map((cat) => {
            const subs = subsFor(cat.slug)
            const isExpanded = openMobile === cat.slug
            return (
              <div key={cat.slug}>
                <div className="flex items-center">
                  <NavLink
                    to={`/${cat.slug}`}
                    className={({ isActive }) =>
                      `flex-1 px-4 py-2.5 rounded-l-lg text-sm font-medium transition-all ${
                        isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-primary-light'
                      }`
                    }
                  >
                    {cat.icon} {cat.label}
                  </NavLink>
                  {subs.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setOpenMobile(isExpanded ? null : cat.slug)}
                      className="px-3 py-2.5 rounded-r-lg text-gray-500 hover:bg-primary-light transition-all"
                    >
                      <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
                {subs.length > 0 && isExpanded && (
                  <div className="pl-6 flex flex-col gap-0.5 mt-1 mb-1">
                    {subs.map((sub) => (
                      <NavLink
                        key={sub.slug}
                        to={`/${sub.slug}`}
                        className={({ isActive }) =>
                          `block px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                            isActive ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-600 hover:bg-primary-light'
                          }`
                        }
                      >
                        {sub.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )
          })}

          {/* Service */}
          {serviceCat && (
            <NavLink
              to={`/${serviceCat.slug}`}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-primary-light'
                }`
              }
            >
              {serviceCat.icon} {serviceCat.label}
            </NavLink>
          )}

          {/* Static links */}
          {staticLinks.map((link) => (
            <NavLink key={link.to} to={link.to}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-primary-light'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Policy links */}
          <div className="mt-2 border-t border-gray-100 pt-2 flex flex-col gap-1">
            {policyLinks.map((link) => (
              <NavLink key={link.to} to={link.to}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-primary-light'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <a
            href="tel:0938777888"
            className="mt-2 flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-full font-bold text-sm"
          >
            Gọi tư vấn ngay
          </a>
        </div>
      </div>
    </header>
  )
}
