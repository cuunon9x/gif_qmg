import { Link } from 'react-router-dom'
import useInView from '../hooks/useInView'

const PROCESS = [
  { step: '01', title: 'Tiếp nhận brief', desc: 'Ghi nhận nhu cầu, số lượng, ngân sách, thời gian và mục tiêu tặng.' },
  { step: '02', title: 'Đề xuất mẫu & báo giá', desc: 'Gửi phương án phù hợp theo nhận diện thương hiệu và ngân sách.' },
  { step: '03', title: 'Chốt thiết kế', desc: 'Duyệt mockup, thống nhất quy cách đóng gói và tiêu chuẩn in ấn.' },
  { step: '04', title: 'Sản xuất & bàn giao', desc: 'Kiểm soát chất lượng, đóng gói và giao đúng tiến độ đã cam kết.' },
]

const STANDARDS = [
  { icon: '🧾', title: 'Minh bạch', desc: 'Báo giá rõ ràng theo số lượng và cấu hình sản phẩm.' },
  { icon: '✅', title: 'Kiểm soát chất lượng', desc: 'Soát lỗi in ấn và đóng gói trước khi xuất kho.' },
  { icon: '🚚', title: 'Giao hàng đúng hẹn', desc: 'Theo thỏa thuận từng đơn; hỗ trợ giao nhiều điểm khi cần.' },
]

export default function WhyUs() {
  const [headRef, headIn] = useInView()
  const [gridRef, gridIn] = useInView()
  const [promoRef, promoIn] = useInView()

  return (
    <>
      {/* Process + standards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div ref={headRef} className={`text-center mb-12 fade-up ${headIn ? 'in-view' : ''}`}>
            <span className="text-primary font-semibold text-xs uppercase tracking-widest">Quy trình</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-1 text-gray-800">Triển khai gọn gàng, đúng chuẩn doanh nghiệp</h2>
            <p className="text-gray-500 text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
              Một quy trình rõ ràng giúp doanh nghiệp dễ duyệt — dễ kiểm soát chất lượng — và yên tâm về tiến độ bàn giao.
            </p>
          </div>

          <div ref={gridRef} className={`grid grid-cols-1 lg:grid-cols-2 gap-6 fade-up ${gridIn ? 'in-view' : ''}`}>
            <div className="rounded-3xl border border-gray-100 bg-gray-50/60 p-6 sm:p-8">
              <h3 className="text-sm font-bold text-gray-800 mb-5">4 bước triển khai</h3>
              <div className="space-y-4">
                {PROCESS.map((p, i) => (
                  <div key={p.step} className="flex gap-4" style={{ transitionDelay: `${i * 60}ms` }}>
                    <div className="shrink-0 w-10 h-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center font-extrabold text-primary">
                      {p.step}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-gray-800">{p.title}</div>
                      <div className="text-sm text-gray-600 leading-relaxed mt-0.5">{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-8">
              <h3 className="text-sm font-bold text-gray-800 mb-5">Tiêu chuẩn vận hành</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {STANDARDS.map((s, i) => (
                  <div key={s.title} className="why-card rounded-2xl bg-gray-50/60 p-5 border border-gray-100" style={{ transitionDelay: `${i * 70}ms` }}>
                    <div className="text-2xl">{s.icon}</div>
                    <div className="mt-3 font-bold text-gray-800 text-sm">{s.title}</div>
                    <div className="mt-1 text-gray-600 text-sm leading-relaxed">{s.desc}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-primary-light border border-primary/20 p-5">
                <div className="text-xs uppercase tracking-widest text-gray-600">Gợi ý nhanh</div>
                <div className="mt-1 text-sm text-gray-700 leading-relaxed">
                  Bạn chỉ cần gửi brief (mục tiêu, số lượng, ngân sách, deadline). QMG sẽ đề xuất mẫu phù hợp và gửi báo giá nhanh.
                </div>
              </div>
            </div>
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
            <span className="inline-block bg-white/10 border border-white/15 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
              Brief → Mockup → Sản xuất
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Nhận mockup theo nhận diện<br />trước khi sản xuất
            </h2>
            <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-lg mx-auto lg:mx-0">
              Gửi logo, guideline màu sắc và thông điệp tri ân. QMG dựng mockup để doanh nghiệp duyệt nhanh, giảm rủi ro sai khác khi triển khai số lượng lớn.
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Link to="/thiet-ke-rieng"
                className="bg-primary text-white font-bold px-7 py-3 rounded-full hover:bg-primary-dark transition-colors text-sm">
                Gửi brief thiết kế
              </Link>
              <a href="tel:0938777888"
                className="border border-white/40 text-white font-semibold px-7 py-3 rounded-full hover:bg-white/10 transition-colors text-sm">
                Hotline tư vấn
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
