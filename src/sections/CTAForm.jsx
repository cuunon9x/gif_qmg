import { useState } from 'react'
import useInView from '../hooks/useInView'
import { submitWeb3Forms } from '../lib/web3forms'

const NEED_OPTIONS = [
  'Quà tặng doanh nghiệp',
  'Giftset cao cấp',
  'Quà tặng sức khỏe – thể thao',
  'In logo sản phẩm',
  'Khác',
]

const BUDGET_OPTIONS = [
  '',
  'Dưới 100.000đ/sp',
  '100.000 – 200.000đ',
  '200.000 – 400.000đ',
  'Trên 500.000đ',
]

export default function CTAForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    need: '',
    qty: '',
    budget: '',
    need_by: '',
    note: '',
  })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [ref, inView] = useInView()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const { ok, message } = await submitWeb3Forms({
        subject: `Yêu cầu tư vấn quà tặng – ${form.name}`,
        ...form,
      })
      if (ok) setSent(true)
      else alert(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle, #00A651 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />
      <div ref={ref} className={`relative max-w-4xl mx-auto px-4 fade-up ${inView ? 'in-view' : ''}`}>
        <div className="text-center mb-10">
          <span className="text-primary font-semibold text-xs uppercase tracking-widest">Nhận tư vấn</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-1 text-white">Đăng ký tư vấn miễn phí</h2>
          <p className="text-gray-400 text-sm mt-2">
            Điền thông tin – đội ngũ QMG sẽ liên hệ trong 5–15 phút (giờ làm việc 7h30–17h) để gửi báo giá và hỗ trợ chi tiết.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          {sent ? (
            <div className="text-center py-8 max-w-md mx-auto">
              <div className="text-5xl mb-3">👋</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Xin chào Quý khách</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-2">
                QMG đã nhận được thông tin của bạn.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-2">
                Đội ngũ tư vấn sẽ liên hệ trong <strong>5–15 phút</strong> để gửi báo giá và hỗ trợ chi tiết.
              </p>
              <p className="text-gray-500 text-sm">Cảm ơn bạn đã quan tâm đến QMG!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Họ và tên *</label>
                <input name="name" required value={form.name} onChange={handleChange}
                  placeholder="Nguyễn Văn A"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Số điện thoại *</label>
                <input name="phone" required value={form.phone} onChange={handleChange}
                  placeholder="0938 xxx xxx"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="email@congty.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Tên công ty / thương hiệu</label>
                <input name="company" value={form.company} onChange={handleChange}
                  placeholder="Công ty ABC"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Nhu cầu quà tặng *</label>
                <select name="need" required value={form.need} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary bg-white">
                  <option value="">-- Chọn hoặc mô tả ở ghi chú --</option>
                  {NEED_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Số lượng dự kiến</label>
                <input name="qty" value={form.qty} onChange={handleChange}
                  placeholder="Ví dụ: 100"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Ngân sách dự kiến</label>
                <select name="budget" value={form.budget} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary bg-white">
                  <option value="">-- Chọn --</option>
                  {BUDGET_OPTIONS.filter(Boolean).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Thời gian cần hàng</label>
                <input name="need_by" type="date" value={form.need_by} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary bg-white" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Ghi chú / yêu cầu chi tiết</label>
                <textarea name="note" rows={3} value={form.note} onChange={handleChange}
                  placeholder="Màu sắc, in logo, địa chỉ giao, ghi chú khác..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none" />
              </div>
              <div className="sm:col-span-2">
                <button type="submit" disabled={loading}
                  className="w-full bg-primary text-white py-3 rounded-full font-bold hover:bg-primary-dark transition-colors text-sm disabled:opacity-60">
                  {loading ? 'Đang gửi...' : 'Gửi yêu cầu tư vấn'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
