import { Link } from 'react-router-dom'
import useInView from '../hooks/useInView'

const REASONS = [
  { icon: '✏️', title: 'Thiết Kế Riêng Miễn Phí', desc: 'In logo, màu thương hiệu, thông điệp tri ân lên hộp quà – hoàn toàn miễn phí, không giới hạn chỉnh sửa.' },
  { icon: '🏆', title: 'Chất Lượng Kiểm Duyệt', desc: 'Mỗi sản phẩm được kiểm tra nghiêm ngặt trước khi đóng gói – đảm bảo nguyên vẹn đến tay người nhận.' },
  { icon: '🚚', title: 'Giao Hàng Toàn Quốc', desc: 'Đội ngũ logistics chuyên nghiệp, giao tận địa chỉ trong và ngoài TP. HCM, đúng hẹn theo hợp đồng.' },
  { icon: '💰', title: 'Giá Tốt – Số Lượng Lớn', desc: 'Bảng giá linh hoạt theo số lượng – đơn từ 50 hộp trở lên được chiết khấu hấp dẫn.' },
  { icon: '⚡', title: 'Phản Hồi Trong 24h', desc: 'Đội tư vấn làm việc T2–T7, phản hồi báo giá và bản thiết kế thử trong vòng 24 giờ làm việc.' },
  { icon: '🤝', title: '500+ Doanh Nghiệp Tin Dùng', desc: 'Từ startup đến tập đoàn lớn – hơn 500 doanh nghiệp đã lựa chọn QMG Gift cho mùa quà doanh nghiệp.' },
]

export default function WhyUs() {
  const [headRef, headIn] = useInView()
  const [gridRef, gridIn] = useInView()
  const [promoRef, promoIn] = useInView()

  return (
    <>
      {/* Why Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div ref={headRef} className={`text-center mb-12 fade-up ${headIn ? 'in-view' : ''}`}>
            <span className="text-primary font-semibold text-xs uppercase tracking-widest">Tại Sao Chọn Chúng Tôi</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-1 text-gray-800">QMG Gift – Giải Pháp Quà Tặng Tin Cậy</h2>
          </div>
          <div ref={gridRef} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 fade-up ${gridIn ? 'in-view' : ''}`}>
            {REASONS.map((r, i) => (
              <div
                key={i}
                className="why-card"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="text-4xl mb-3">{r.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{r.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Promo Banner */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #C5A059 0, #C5A059 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}
        />
        <div ref={promoRef} className={`relative max-w-5xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-10 fade-up ${promoIn ? 'in-view' : ''}`}>
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
              Miễn Phí 100%
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Thiết Kế Hộp Quà Theo<br />Thương Hiệu Của Bạn
            </h2>
            <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-lg mx-auto lg:mx-0">
              Đội ngũ designer của QMG sẽ tạo ra hộp quà mang đúng màu sắc, logo và thông điệp tri ân của doanh nghiệp bạn – hoàn toàn miễn phí, không giới hạn lần sửa.
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Link to="/thiet-ke-rieng"
                className="bg-primary text-white font-bold px-7 py-3 rounded-full hover:bg-primary-dark transition-colors text-sm">
                Đặt Thiết Kế Ngay
              </Link>
              <a href="tel:0909123456"
                className="border border-white/40 text-white font-semibold px-7 py-3 rounded-full hover:bg-white/10 transition-colors text-sm">
                Gọi Tư Vấn
              </a>
            </div>
          </div>
          <div className="lg:w-96 w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80"
              alt="Thiết kế hộp quà riêng"
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  )
}
