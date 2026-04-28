import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

/**
 * Logo khách hàng + dòng phụ (dùng Navbar / Footer).
 */
export default function BrandLockup({ footer = false }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 shrink-0 min-w-0">
      <img
        src={logo}
        alt="Quang Minh Gift - QMG"
        className="h-9 sm:h-10 w-auto max-w-[150px] sm:max-w-[180px] object-contain object-left"
        width={180}
        height={40}
        decoding="async"
      />
      <div className="leading-tight min-w-0">
        <div className={`font-bold text-base leading-none ${footer ? 'text-white' : 'text-gray-900'}`}>
          QMG Gift
        </div>
        <div className="text-[10px] text-primary font-medium tracking-wide">
          Quà Tặng Doanh Nghiệp
        </div>
      </div>
    </Link>
  )
}
