import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

/**
 * Logo khách hàng + dòng phụ (dùng Navbar / Footer).
 */
export default function BrandLockup({ footer = false }) {
  return (
    <Link to="/" className="flex items-center gap-3 shrink-0 min-w-0">
      <img
        src={logo}
        alt="Quang Minh Group HVAC"
        className="h-10 sm:h-11 w-auto max-w-[150px] sm:max-w-[180px] object-contain object-left"
        width={180}
        height={44}
        decoding="async"
        loading="eager"
      />
      <div className="leading-tight hidden sm:block min-w-0">
        <div className={`font-bold text-sm ${footer ? 'text-white' : 'text-gray-900'}`}>
          Quang Minh Group HVAC
        </div>
        <div className="text-[11px] text-primary font-medium tracking-wide">
          Giải Pháp Điện Lạnh Toàn Diện
        </div>
      </div>
    </Link>
  )
}
