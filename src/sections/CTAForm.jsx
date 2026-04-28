import { useState } from 'react'
import useInView from '../hooks/useInView'
import { submitWeb3Forms } from '../lib/web3forms'

const TYPES = ['Quà Tết Doanh Nghiệp', 'Bánh Trung Thu', 'Thiết Kế Hộp Quà Riêng', 'Rượu Vang & Đặc Sản', 'Khác']

export default function CTAForm() {
  const [form, setForm] = useState({ name: '', phone: '', company: '', type: '', note: '' })
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
        style={{ backgroundImage: 'radial-gradient(circle, #C5A059 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />
      <div ref={ref} className={`relative max-w-4xl mx-auto px-4 fade-up ${inView ? 'in-view' : ''}`}>
        <div className="text-center mb-10">
          <span className="text-primary font-semibold text-xs uppercase tracking-widest">Nhận Tư Vấn</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-1 text-white">Đăng Ký Tư Vấn Miễn Phí</h2>
          <p className="text-gray-400 text-sm mt-2">Điền thông tin – đội ngũ QMG Gift sẽ liên hệ trong vòng 30 phút.</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          {sent ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-3">🎁</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Đăng ký thành công!</h3>
              <p className="text-gray-500 text-sm">Cảm ơn bạn. Chúng tôi sẽ liên hệ tư vấn trong 30 phút làm việc.</p>
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
                  placeholder="0909 xxx xxx"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Tên công ty</label>
                <input name="company" value={form.company} onChange={handleChange}
                  placeholder="Công ty ABC"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Loại quà tặng *</label>
                <select name="type" required value={form.type} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary bg-white">
                  <option value="">-- Chọn loại --</option>
                  {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Ghi chú thêm</label>
                <textarea name="note" rows={3} value={form.note} onChange={handleChange}
                  placeholder="Số lượng dự kiến, ngân sách, yêu cầu đặc biệt..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none" />
              </div>
              <div className="sm:col-span-2">
                <button type="submit" disabled={loading}
                  className="w-full bg-primary text-white py-3 rounded-full font-bold hover:bg-primary-dark transition-colors text-sm disabled:opacity-60">
                  {loading ? 'Đang gửi...' : '🎁 Gửi Yêu Cầu Tư Vấn'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
