import useInView from '../hooks/useInView'

const POSTS = [
  {
    image: 'https://res.cloudinary.com/dflar7nvn/image/upload/v1778487271/qmg/products/yde0dtlinu0dmxt68y3o.png?w=600&q=80',
    category: 'Máy Lạnh',
    date: '20/07/2026',
    title: '5 Lưu Ý Khi Chọn Máy Lạnh Cho Văn Phòng Và Nhà Xưởng',
    excerpt: 'Chọn máy lạnh đúng công suất và thương hiệu là yếu tố quyết định hiệu quả làm lạnh và tiết kiệm điện. QMG HVAC chia sẻ những tiêu chí quan trọng giúp bạn quyết định đúng.',
  },
  {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    category: 'Bảo Trì',
    date: '15/07/2026',
    title: 'Tần Suất Vệ Sinh Máy Lạnh Lý Tưởng – Giữ Hiệu Suất, Tiết Kiệm Chi Phí',
    excerpt: 'Máy lạnh cần vệ sinh định kỳ theo tần suất sử dụng và môi trường. QMG HVAC hướng dẫn chi tiết giúp thiết bị vận hành tốt hơn và tiết kiệm 15–30% điện năng.',
  },
  {
    image: 'https://res.cloudinary.com/dflar7nvn/image/upload/v1778763998/qmg/products/t8oc7foaybjgonoix5ue.png?w=600&q=80',
    category: 'HVAC',
    date: '10/07/2026',
    title: 'HVAC Trung Tâm Khác Gì So Với Máy Lạnh Dân Dụng?',
    excerpt: 'Hệ thống điều hòa trung tâm phù hợp với khách sạn, tòa nhà văn phòng và thương mại. QMG HVAC phân tích rõ ưu điểm, chi phí và điều kiện nên chọn.',
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
            <h2 className="text-2xl md:text-3xl font-bold mt-1 text-gray-800">Kiến Thức HVAC & Điện Lạnh</h2>
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
