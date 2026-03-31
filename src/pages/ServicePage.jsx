import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useInView from '../hooks/useInView'

const STEPS = [
  { step: '01', icon: '📞', title: 'Liên Hệ & Tư Vấn', desc: 'Gọi điện hoặc nhắn Zalo – chúng tôi tư vấn miễn phí về loại quà, số lượng, ngân sách phù hợp.' },
  { step: '02', icon: '✏️', title: 'Gửi Yêu Cầu Thiết Kế', desc: 'Cung cấp logo, màu thương hiệu và thông điệp – đội designer sẽ tạo bản thử trong vòng 24h.' },
  { step: '03', icon: '✅', title: 'Duyệt & Sản Xuất', desc: 'Sau khi bạn xác nhận bản thiết kế, chúng tôi tiến hành sản xuất theo đúng số lượng đặt hàng.' },
  { step: '04', icon: '🚚', title: 'Đóng Gói & Giao Hàng', desc: 'Hộp quà được đóng gói cẩn thận, giao tận địa chỉ – trong và ngoài TP. HCM, toàn quốc.' },
]

export default function ServicePage() {
  const [form, setForm] = useState({ name: '', phone: '', company: '', quantity: '', design: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [headRef, headIn] = useInView()
  const [stepsRef, stepsIn] = useInView()
  const [formRef, formIn] = useInView()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY',
          subject: `Yêu cầu thiết kế hộp quà riêng – ${form.name}`,
          ...form,
        }),
      })
      if (res.ok) setSent(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="pt-20 min-h-screen">
      {/* Breadcrumb */}
      {/* <div className="bg-primary-light py-3 px-4">
        <div className="max-w-7xl mx-auto text-xs text-gray-500 flex items-center gap-1.5">
          <Link to="/" className="hover:text-primary">Trang Chủ</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium">Thiết Kế Riêng</span>
        </div>
      </div> */}

      {/* Hero banner */}
      <div className="relative h-60 md:h-80 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Dịch Vụ Miễn Phí</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3">Thiết Kế Hộp Quà Riêng</h1>
          <p className="text-white/80 text-sm max-w-lg">100% miễn phí – In logo, màu sắc & thông điệp của doanh nghiệp bạn lên hộp quà.</p>
        </div>
      </div>

      {/* Intro */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div ref={headRef} className={`text-center mb-12 fade-up ${headIn ? 'in-view' : ''}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Tại Sao Cần Hộp Quà Mang Thương Hiệu?</h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
              Một hộp quà có logo doanh nghiệp không chỉ sang trọng hơn – nó trở thành công cụ marketing hiệu quả. Người nhận nhớ thương hiệu của bạn mỗi khi nhìn vào hộp quà. QMG Gift thiết kế miễn phí, đảm bảo đồng nhất với bộ nhận diện của bạn.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: '🎨', title: 'Không giới hạn sửa', desc: 'Chỉnh sửa bản thiết kế thoải mái đến khi hài lòng' },
              { icon: '⚡', title: 'Giao bản thử 24h', desc: 'Nhận bản thiết kế thử trong vòng 24 giờ làm việc' },
              { icon: '🏭', title: 'Sản xuất ngay', desc: 'Sau khi duyệt – sản xuất và giao hàng đúng tiến độ' },
            ].map((f, i) => (
              <div key={i} className="bg-primary-light rounded-2xl p-6">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-gray-800 mb-1">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">Quy Trình Đặt Hàng</h2>
          <div ref={stepsRef} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 fade-up ${stepsIn ? 'in-view' : ''}`}>
            {STEPS.map((s, i) => (
              <div key={i} className="relative text-center" style={{ transitionDelay: `${i * 80}ms` }}>
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-3/4 w-1/2 h-0.5 bg-primary/30" />
                )}
                <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-2xl mx-auto mb-3">
                  {s.icon}
                </div>
                <div className="text-xs text-primary font-bold mb-1">Bước {s.step}</div>
                <h3 className="font-bold text-gray-800 text-sm mb-2">{s.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-14 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Gửi Yêu Cầu Thiết Kế</h2>
          <p className="text-gray-500 text-sm text-center mb-8">Điền thông tin – QMG Gift sẽ liên hệ trong vòng 24 giờ làm việc.</p>

          <div ref={formRef} className={`bg-primary-light rounded-3xl p-8 fade-up ${formIn ? 'in-view' : ''}`}>
            {sent ? (
              <div className="text-center py-6">
                <div className="text-5xl mb-3">✅</div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">Yêu cầu đã gửi!</h3>
                <p className="text-gray-500 text-sm">Chúng tôi sẽ liên hệ trong 24 giờ làm việc.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Họ và tên *</label>
                    <input name="name" required value={form.name} onChange={handleChange}
                      placeholder="Nguyễn Văn A"
                      className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Số điện thoại *</label>
                    <input name="phone" required value={form.phone} onChange={handleChange}
                      placeholder="0909 xxx xxx"
                      className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Tên công ty</label>
                  <input name="company" value={form.company} onChange={handleChange}
                    placeholder="Công ty TNHH ABC"
                    className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Số lượng dự kiến</label>
                  <input name="quantity" value={form.quantity} onChange={handleChange}
                    placeholder="VD: 200 hộp"
                    className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Yêu cầu thiết kế</label>
                  <textarea name="design" rows={4} value={form.design} onChange={handleChange}
                    placeholder="Màu thương hiệu, thông điệp, link logo hoặc mô tả yêu cầu..."
                    className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-primary text-white py-3 rounded-full font-bold hover:bg-primary-dark transition-colors text-sm disabled:opacity-60">
                  {loading ? 'Đang gửi...' : '✏️ Gửi Yêu Cầu Thiết Kế'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
