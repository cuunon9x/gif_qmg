import useInView from '../hooks/useInView'

const REVIEWS = [
  {
    name: 'Anh Minh Tuấn',
    company: 'Công Ty TNHH Xây Dựng Hưng Phát',
    avatar: 'T',
    text: 'QMG HVAC tư vấn rất tận tâm, lắp đặt nhanh gọn và đúng kỹ thuẫt. Máy lạnh Daikin vận hành êm và mát tốt hơn mông đợi. Rất hài lòng!',
    stars: 5,
  },
  {
    name: 'Chị Thu Hương',
    company: 'Văn Phòng Công Ty Bảo Tín',
    avatar: 'H',
    text: 'Quy trình khảo sát và báo giá rất minh bạch, không phát sinh chi phí. Đội thi công chuyên nghiệp, giao máy đúng hẹn. Sẽ tiếp tục hợp tác!',
    stars: 5,
  },
  {
    name: 'Anh Văn Khoa',
    company: 'Khách Sạn Sunrise',
    avatar: 'K',
    text: 'QMG HVAC xử lý toàn bộ hệ thống điều hòa cho khách sạn chúng tôi rất chuyên nghiệp. Bảo trì định kỳ đúng giờ, kỹ thuẫt viên nhiệt tình.',
    stars: 5,
  },
  {
    name: 'Anh Thanh Long',
    company: 'Nhà Máy Sản Xuất Việt Đức',
    avatar: 'L',
    text: 'Lần đầu hợp tác có chút lo, nhưng QMG HVAC xử lý mọi thứ rất bài bản – từ báo giá, thi công đến nghiệm thu. Hoàn toàn yên tâm!',
    stars: 5,
  },
]

function Stars({ count = 5 }) {
  return <div className="flex gap-0.5 text-yellow-400 text-sm">{Array(count).fill('★').join('')}</div>
}

export default function Testimonials() {
  const [headRef, headIn] = useInView()
  const [gridRef, gridIn] = useInView()

  return (
    <section className="py-16 bg-primary-light">
      <div className="max-w-7xl mx-auto px-4">
        <div ref={headRef} className={`text-center mb-12 fade-up ${headIn ? 'in-view' : ''}`}>
          <span className="text-primary font-semibold text-xs uppercase tracking-widest">Đánh Giá Khách Hàng</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-1 text-gray-800">Khách Hàng Nói Về Chúng Tôi</h2>
        </div>

        <div ref={gridRef} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 fade-up ${gridIn ? 'in-view' : ''}`}>
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="review-card"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Stars count={r.stars} />
              <p className="text-gray-600 text-sm leading-relaxed mt-3 mb-4 italic">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  {r.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">{r.name}</div>
                  <div className="text-gray-400 text-xs">{r.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
