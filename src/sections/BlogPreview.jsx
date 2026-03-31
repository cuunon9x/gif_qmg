import useInView from '../hooks/useInView'

const POSTS = [
  {
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80',
    category: 'Quà Tết',
    date: '20/03/2026',
    title: '5 Gợi Ý Chọn Quà Tết Doanh Nghiệp Ý Nghĩa Năm 2026',
    excerpt: 'Chọn quà Tết cho doanh nghiệp không chỉ là vật trao tay – đó là lời tri ân, là bộ mặt thương hiệu. Cùng QMG Gift khám phá 5 gợi ý chọn quà ý nghĩa năm nay.',
  },
  {
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80',
    category: 'Trung Thu',
    date: '15/03/2026',
    title: 'Xu Hướng Hộp Bánh Trung Thu Doanh Nghiệp 2026 – Sang Trọng & Bền Vững',
    excerpt: 'Năm 2026, xu hướng hộp bánh trung thu doanh nghiệp nghiêng về thiết kế tối giản – vật liệu tái sử dụng – nhân bánh cao cấp độc đáo. QMG Gift tổng hợp chi tiết.',
  },
  {
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80',
    category: 'Thiết Kế',
    date: '10/03/2026',
    title: 'Thiết Kế Hộp Quà Theo Thương Hiệu – Lợi Ích Dài Hạn Cho Doanh Nghiệp',
    excerpt: 'Hộp quà có logo doanh nghiệp không chỉ đẹp hơn – nó còn là công cụ marketing hiệu quả. Cùng hiểu vì sao ngày càng nhiều doanh nghiệp lựa chọn thiết kế riêng.',
  },
]

export default function BlogPreview() {
  const [headRef, headIn] = useInView()
  const [gridRef, gridIn] = useInView()

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div ref={headRef} className={`flex items-end justify-between mb-10 fade-up ${headIn ? 'in-view' : ''}`}>
          <div>
            <span className="text-primary font-semibold text-xs uppercase tracking-widest">Tin Tức</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-1 text-gray-800">Tips & Xu Hướng Quà Tặng</h2>
          </div>
          <a href="#" className="hidden sm:block text-primary text-sm font-semibold hover:underline">
            Xem tất cả →
          </a>
        </div>

        <div ref={gridRef} className={`grid grid-cols-1 sm:grid-cols-3 gap-6 fade-up ${gridIn ? 'in-view' : ''}`}>
          {POSTS.map((p, i) => (
            <article
              key={i}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="overflow-hidden aspect-video bg-gray-100">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">{p.category}</span>
                  <span className="text-gray-400 text-xs">{p.date}</span>
                </div>
                <h3 className="font-bold text-gray-800 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">{p.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
