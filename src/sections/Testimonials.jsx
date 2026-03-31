import useInView from '../hooks/useInView'

const REVIEWS = [
  {
    name: 'Chị Bảo Trân',
    company: 'Healthcare Science Co.',
    avatar: 'B',
    text: 'Làm việc với QMG Gift rất hài lòng – cả team hỗ trợ nhiệt tình, thiết kế đẹp đúng yêu cầu, giao hàng đúng hẹn. Năm sau chắc chắn sẽ tiếp tục đặt!',
    stars: 5,
  },
  {
    name: 'Anh Phạm Văn Minh',
    company: 'Công ty Pionero',
    avatar: 'M',
    text: 'Cảm ơn QMG đã nhiệt tình hỗ trợ. Hộp quà đẹp, sang trọng, khách hàng nhận đều khen. Mong QMG ngày càng phát triển và có nhiều đơn hàng.',
    stars: 5,
  },
  {
    name: 'Anh Trần Linh',
    company: 'Mekong Bros',
    avatar: 'L',
    text: 'Nhân viên của QMG rất chuyên nghiệp. Hộp bánh Trung Thu year nay xinh lắm, kích thước vừa đủ, giá cả hợp lý. Sẽ hợp tác lâu dài.',
    stars: 5,
  },
  {
    name: 'Chị Kim Anh',
    company: 'BĐS Thiên Minh Capital',
    avatar: 'K',
    text: 'Từng lo lắng vì đặt số lượng lớn lần đầu, nhưng QMG xử lý mọi thứ rất chuyên nghiệp – từ báo giá, thiết kế đến giao hàng. Hoàn toàn an tâm!',
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
