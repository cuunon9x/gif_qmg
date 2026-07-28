import { Link } from 'react-router-dom'
import useInView from '../hooks/useInView'

const PROCESS = [
  { step: '01', title: 'Tiếp nhận yêu cầu', desc: 'Tiếp nhận thông tin từ khách hàng, tư vấn nhu cầu sử dụng, loại công trình, diện tích và ngân sách để đưa ra giải pháp phù hợp.' },
  { step: '02', title: 'Khảo sát &amp; Báo giá', desc: 'Kỹ thuẫt viên khảo sát thực tế (nếu cần), tư vấn phương án lắp đặt tối ưu và gửi báo giá chi tiết, minh bạch, không phát sinh chi phí.' },
  { step: '03', title: 'Thi công &amp; Lắp đặt', desc: 'Tiến hành thi công theo đúng tiêu chuẩn HVAC, đảm bảo kỹ thuẫt, an toàn, tính thẩm mỹ và đúng tiến độ đã cam kết.' },
  { step: '04', title: 'Nghiệm thu &amp; Bảo hành', desc: 'Kiểm tra vận hành toàn bộ hệ thống, bàn giao cho khách hàng, hướng dẫn sử dụng và kích hoạt bảo hành, bảo trì định kỳ.' },
]

const STANDARDS = [
  { icon: '📝', title: 'Báo giá minh bạch', desc: 'Báo giá chi tiết theo từng hạng mục, thiết bị và vẫt tư. Cam kết không phát sinh chi phí ngoài thỏa thuận.' },
  { icon: '✅', title: 'Thi công đúng kỹ thuẫt', desc: 'Đội ngũ kỹ thuẫt viên giàu kinh nghiệm, thi công theo tiêu chuẩn HVAC, đảm bảo an toàn và thẩm mỹ.' },
  { icon: '🚚', title: 'Đúng tiến độ', desc: 'Cung cấp thiết bị và hoàn thành lắp đặt đúng thời gian cam kết, đáp ứng tiến độ cho mọi công trình.' },
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
            <h2 className="text-2xl md:text-3xl font-bold mt-1 text-gray-800">Quy trình thi công chuẩn HVAC</h2>
            <p className="text-gray-500 text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
              Một quy trình rõ ràng giúp khách hàng dễ theo dõi — kiểm soát tiến độ — và yên tâm về chất lượng bàn giao.
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
                  Chỉ cần cho chúng tôi biết nhu cầu sử dụng, diện tích công trình và ngân sách. QMG HVAC sẽ tư vấn giải pháp phù hợp, khảo sát tận nơi (nếu cần) và gửi báo giá nhanh chóng, hoàn toàn miễn phí.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Promo Banner */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #0057A8 0, #0057A8 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}
        />
        <div ref={promoRef} className={`relative max-w-5xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-10 fade-up ${promoIn ? 'in-view' : ''}`}>
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block bg-white/10 border border-white/15 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
              Tư Vấn → Khảo Sát → Thi Công
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Giải pháp điện lạnh toàn diện<br />cho mọi công trình
            </h2>
            <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-lg mx-auto lg:mx-0">
              Từ máy lạnh dân dụng đến hệ thống điều hòa trung tâm, QMG HVAC mang đến giải pháp trọn gói giúp công trình vận hành hiệu quả, bền bỉ và tối ưu chi phí đầu tư.
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Link to="/checkout"
                className="bg-primary text-white font-bold px-7 py-3 rounded-full hover:bg-primary-dark transition-colors text-sm">
                Nhận báo giá miễn phí
              </Link>
              <a href="tel:0938777888"
                className="border border-white/40 text-white font-semibold px-7 py-3 rounded-full hover:bg-white/10 transition-colors text-sm">
                Hotline tư vấn
              </a>
            </div>
          </div>
          <div className="lg:w-96 w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://res.cloudinary.com/dflar7nvn/image/upload/v1778763998/qmg/products/t8oc7foaybjgonoix5ue.png?w=800&q=80"
              alt="Thi công lắp đặt điện lạnh"
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  )
}
