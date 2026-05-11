import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

const SITE = 'https://quatangqmg.com'

const DEFAULT_DESC =
  'QMG Gift chuyên quà tặng doanh nghiệp cao cấp: quà Tết, quà sức khỏe, thiết kế hộp quà riêng, in logo theo nhận diện. Tư vấn nhanh và giao hàng toàn quốc.'

const INDEX_ROBOTS =
  'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'

const ROUTES = {
  '/': {
    title: 'QMG Gift – Quà Tặng Doanh Nghiệp Cao Cấp',
    description: DEFAULT_DESC,
  },
  '/qua-tang-doanh-nghiep': {
    title: 'Quà Tặng Doanh Nghiệp | QMG Gift',
    description:
      'Quà tặng doanh nghiệp cao cấp: quà Tết, quà sự kiện, hộp quà thương hiệu. Thiết kế & in logo theo nhận diện, giao hàng toàn quốc.',
  },
  '/qua-tang-suc-khoe': {
    title: 'Quà Tặng Sức Khỏe Doanh Nghiệp | QMG Gift',
    description:
      'Quà tặng sức khỏe cho doanh nghiệp: granola, ngũ cốc, set quà dinh dưỡng. Phù hợp nhân sự, đối tác và chiến dịch chăm sóc sức khỏe.',
  },
  '/thiet-ke-rieng': {
    title: 'Thiết Kế Hộp Quà Riêng | QMG Gift',
    description:
      'Thiết kế hộp quà riêng theo thương hiệu: mockup trước sản xuất, in logo theo nhận diện, tối ưu ngân sách và timeline.',
  },
  '/checkout': {
    title: 'Đặt Hàng / Liên Hệ | QMG Gift',
    description:
      'Gửi yêu cầu đặt quà tặng doanh nghiệp: thông tin liên hệ, ngân sách, số lượng và thời gian giao hàng mong muốn.',
  },
}

function stripTrailingSlash(p) {
  if (!p || p === '/') return '/'
  return p.endsWith('/') ? p.slice(0, -1) : p
}

function metaForPath(pathname) {
  const path = stripTrailingSlash(pathname)
  if (ROUTES[path]) return ROUTES[path]
  if (path.startsWith('/san-pham/')) {
    return {
      title: 'Sản phẩm | QMG Gift',
      description: DEFAULT_DESC,
    }
  }
  if (path.startsWith('/admin')) {
    return {
      title: 'Quản trị | QMG Gift',
      description: 'Trang quản trị nội bộ.',
    }
  }
  return { title: 'QMG Gift – Quà Tặng Doanh Nghiệp Cao Cấp', description: DEFAULT_DESC }
}

function setMetaContent(selector, content) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute('content', content)
}

export default function SeoHead() {
  const { pathname } = useLocation()
  const path = stripTrailingSlash(pathname)
  const meta = useMemo(() => metaForPath(pathname), [pathname])
  const canonical = path === '/' ? `${SITE}/` : `${SITE}${path}`

  useEffect(() => {
    document.title = meta.title

    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.setAttribute('href', canonical)

    const descEl = document.head.querySelector('meta[name="description"]')
    if (descEl && meta.description) descEl.setAttribute('content', meta.description)

    const robotsEl = document.head.querySelector('meta[name="robots"]')
    if (robotsEl) {
      robotsEl.setAttribute(
        'content',
        path.startsWith('/admin') ? 'noindex,nofollow' : INDEX_ROBOTS,
      )
    }

    setMetaContent('meta[property="og:url"]', canonical)
    setMetaContent('meta[property="og:title"]', meta.title)
    if (meta.description) {
      setMetaContent('meta[property="og:description"]', meta.description)
      setMetaContent('meta[name="twitter:title"]', meta.title)
      setMetaContent('meta[name="twitter:description"]', meta.description)
    }
  }, [canonical, meta, path])

  return null
}
