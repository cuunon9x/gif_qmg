import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

const SITE = 'https://qmghvac.com'

const DEFAULT_DESC =
  'QMG HVAC – Giải pháp điện lạnh toàn diện: cung cấp, tư vấn, thiết kế, thi công và bảo trì hệ thống điều hòa không khí chính hãng. Hotline: 0938 777 888.'

const INDEX_ROBOTS =
  'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'

const ROUTES = {
  '/': {
    title: 'QMG HVAC – Giải Pháp Điện Lạnh Toàn Diện',
    description: DEFAULT_DESC,
  },
  '/daikin': {
    title: 'Máy Lạnh Daikin Chính Hãng | QMG HVAC',
    description: 'Cung cấp, lắp đặt máy lạnh Daikin chính hãng. Tư vấn miễn phí, bảo hành chính hãng, thi công chuẩn kỹ thuật HVAC.',
  },
  '/midea': {
    title: 'Máy Lạnh Midea Chính Hãng | QMG HVAC',
    description: 'Cung cấp, lắp đặt máy lạnh Midea chính hãng. Giá tốt, bảo hành chính hãng, thi công chuẩn kỹ thuật HVAC.',
  },
  '/mitsubishi': {
    title: 'Máy Lạnh Mitsubishi Chính Hãng | QMG HVAC',
    description: 'Cung cấp, lắp đặt máy lạnh Mitsubishi chính hãng. Tư vấn miễn phí, bảo hành chính hãng, thi công chuẩn kỹ thuật HVAC.',
  },
  '/toshiba': {
    title: 'Máy Lạnh Toshiba Chính Hãng | QMG HVAC',
    description: 'Cung cấp, lắp đặt máy lạnh Toshiba chính hãng. Giá tốt, bảo hành chính hãng, thi công chuẩn kỹ thuật HVAC.',
  },
  '/panasonic': {
    title: 'Máy Lạnh Panasonic Chính Hãng | QMG HVAC',
    description: 'Cung cấp, lắp đặt máy lạnh Panasonic chính hãng. Tư vấn miễn phí, bảo hành chính hãng, thi công chuẩn kỹ thuật HVAC.',
  },
  '/dich-vu': {
    title: 'Dịch Vụ HVAC | QMG HVAC',
    description: 'Dịch vụ thi công lắp đặt, bảo trì, vệ sinh máy lạnh và hệ thống HVAC toàn diện cho nhà ở, văn phòng và công trình.',
  },
  '/checkout': {
    title: 'Nhận Báo Giá | QMG HVAC',
    description: 'Gửi yêu cầu nhận báo giá miễn phí tư vấn và lắp đặt hệ thống điện lạnh HVAC.',
  },
  '/chinh-sach-bao-mat': {
    title: 'Chính Sách Bảo Mật | QMG HVAC',
    description: 'Chính sách bảo mật thông tin khách hàng của QMG HVAC đối với website, form liên hệ và đơn hàng.',
  },
  '/chinh-sach-mua-hang': {
    title: 'Chính Sách Mua Hàng | QMG HVAC',
    description: 'Chính sách đặt hàng, thanh toán, giao hàng, bảo hành và đổi trả của Quang Minh Group HVAC.',
  },
  '/gioi-thieu': {
    title: 'Giới Thiệu Công Ty | QMG HVAC – Quang Minh Group',
    description: 'Quang Minh Group HVAC – chuyên gia giải pháp điều hòa không khí: cung cấp, thi công, bảo trì hệ thống HVAC chính hãng tại Bình Dương và toàn quốc.',
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
      title: 'Sản phẩm | QMG HVAC',
      description: DEFAULT_DESC,
    }
  }
  if (path.startsWith('/admin')) {
    return {
      title: 'Quản trị | QMG HVAC',
      description: 'Trang quản trị nội bộ.',
    }
  }
  return { title: 'QMG HVAC – Giải Pháp Điện Lạnh Toàn Diện', description: DEFAULT_DESC }
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
