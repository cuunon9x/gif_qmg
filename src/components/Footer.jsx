import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">QMG</div>
              <div>
                <div className="font-bold text-white text-base leading-none">QMG Gift</div>
                <div className="text-[10px] text-primary font-medium tracking-wide">Quà Tặng Doanh Nghiệp</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              QMG cung cấp giải pháp quà tặng doanh nghiệp và quà tặng sức khỏe, kết hợp thiết kế sáng tạo với in logo theo nhận diện thương hiệu.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://facebook.com/QuangMinhGiftQMG" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full bg-gray-700 hover:bg-primary flex items-center justify-center transition-colors text-sm">
                f
              </a>
              <a href="https://zalo.me/0938777888" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full bg-gray-700 hover:bg-primary flex items-center justify-center transition-colors text-xs font-bold">
                Z
              </a>
            </div>
          </div>

          {/* Sản phẩm */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Sản Phẩm</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/qua-tang-doanh-nghiep" className="hover:text-primary transition-colors">Quà Tặng Doanh Nghiệp</Link></li>
              <li><Link to="/qua-tang-suc-khoe" className="hover:text-primary transition-colors">Quà Tặng Sức Khỏe</Link></li>
              <li><Link to="/thiet-ke-rieng" className="hover:text-primary transition-colors">Thiết Kế Hộp Quà Riêng</Link></li>
            </ul>
          </div>

          {/* Dịch vụ */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Dịch Vụ</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-1.5"><span className="text-primary mt-0.5">✓</span> Thiết kế logo lên hộp quà miễn phí</li>
              <li className="flex items-start gap-1.5"><span className="text-primary mt-0.5">✓</span> Giao hàng toàn quốc</li>
              <li className="flex items-start gap-1.5"><span className="text-primary mt-0.5">✓</span> Tư vấn chọn quà theo ngân sách</li>
              <li className="flex items-start gap-1.5"><span className="text-primary mt-0.5">✓</span> Đặt hàng số lượng lớn ưu đãi</li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Liên Hệ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">📍</span>
                <span>3/49 đường Thủ Khoa Huân, Khu phố Bình Thuận 1, TP. Thuận An, Bình Dương</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">📞</span>
                <a href="tel:0938777888" className="hover:text-primary transition-colors">0938 777 888 - 0976 926 868</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✉️</span>
                <a href="mailto:quangminhgift.qmg@gmail.com" className="hover:text-primary transition-colors">quangminhgift.qmg@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">⏰</span>
                <span>7:30 – 17:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} QMG Gift – Quà Tặng Doanh Nghiệp Cao Cấp. All rights reserved.</p>
          <p>Thiết kế & phát triển bởi <span className="text-primary">QMG Team</span></p>
        </div>
      </div>
    </footer>
  )
}
