import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import useInView from '../hooks/useInView'
import { submitResendEmail } from '../lib/resend'
import { displayPrice } from '../lib/price'

export default function CheckoutPage() {
  const { items, totalQty, totalPrice, formatVND, clear } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', phone: '', email: '', company: '', address: '', note: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [ref, inView] = useInView()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    if (!done && items.length === 0) navigate('/', { replace: true })
  }, [items, done, navigate])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const orderLines = items.map(i => `• ${i.name} x${i.qty} — ${displayPrice(i)}`).join('\n')
    const total = totalPrice > 0 ? `Tổng: ${formatVND(totalPrice)}` : 'Tổng: Liên hệ báo giá'

    try {
      const { ok, message } = await submitResendEmail({
        subject: `Đơn hàng mới – ${form.name} (${form.phone})`,
        fields: {
          ...form,
          order_items: orderLines,
          order_total: total,
        },
      })
      if (ok) {
        clear()
        setDone(true)
      } else {
        alert(message)
      }
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-7xl mb-5">🎁</div>
          <h1 className="text-2xl font-extrabold text-gray-800 mb-3">Đặt hàng thành công!</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-2">
            Xin chào Quý khách 👋 QMG đã nhận được thông tin của bạn.
          </p>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Đội ngũ tư vấn sẽ liên hệ trong 5–15 phút để gửi báo giá và hỗ trợ chi tiết. Cảm ơn bạn đã quan tâm đến QMG!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/"
              className="bg-primary text-white font-bold px-7 py-3 rounded-full hover:bg-primary-dark transition-colors text-sm">
              Về trang chủ
            </Link>
            <a href="tel:0938777888"
              className="border border-primary text-primary font-semibold px-7 py-3 rounded-full hover:bg-primary-light transition-colors text-sm">
              Gọi ngay
            </a>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-extrabold text-gray-800 mb-8">Xác nhận đơn hàng</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div ref={ref} className={`lg:col-span-3 fade-up ${inView ? 'in-view' : ''}`}>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-700 text-base mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">1</span>
                Thông tin liên hệ
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="email@example.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Tên công ty</label>
                  <input name="company" value={form.company} onChange={handleChange}
                    placeholder="Công ty TNHH ABC"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Địa chỉ giao hàng *</label>
                  <input name="address" required value={form.address} onChange={handleChange}
                    placeholder="Số nhà, đường, phường, quận, thành phố..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Yêu cầu thiết kế / Ghi chú</label>
                  <textarea name="note" rows={3} value={form.note} onChange={handleChange}
                    placeholder="Logo thương hiệu, màu hộp, thời gian cần giao, yêu cầu đặc biệt..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none" />
                </div>

                <div className="pt-2">
                  <button type="submit" disabled={loading}
                    className="w-full bg-primary text-white py-3.5 rounded-full font-bold hover:bg-primary-dark transition-colors text-sm shadow-lg disabled:opacity-60">
                    {loading ? 'Đang gửi đơn...' : 'Xác nhận đặt hàng'}
                  </button>
                  <p className="text-xs text-gray-400 text-center mt-2">
                    Nhân viên sẽ gọi xác nhận và báo giá chi tiết trong 5–15 phút (giờ làm việc 7h30–17h).
                  </p>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="font-bold text-gray-700 text-base mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">2</span>
                Đơn hàng ({totalQty} sản phẩm)
              </h2>

              <div className="flex flex-col gap-4 mb-5">
                {items.map(item => (
                  <div key={item.slug} className="flex gap-3 items-start">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                      <img src={item.images?.[0] || item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-700 line-clamp-2 leading-snug">{item.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">SL: {item.qty}</p>
                    </div>
                    <div className="shrink-0 text-sm font-bold text-primary whitespace-nowrap">
                      {item.priceNum > 0 ? formatVND(item.priceNum * item.qty) : 'Liên hệ'}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Phí vận chuyển</span>
                  <span className="text-green-600 font-medium">Báo sau</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Thiết kế riêng</span>
                  <span className="text-green-600 font-medium">Miễn phí</span>
                </div>
                <div className="flex justify-between font-bold text-gray-800 pt-2 border-t border-gray-100">
                  <span>Tổng cộng</span>
                  <span className="text-primary text-lg">
                    {totalPrice > 0 ? formatVND(totalPrice) : 'Liên hệ báo giá'}
                  </span>
                </div>
              </div>

              <div className="mt-5 p-3 bg-primary-light rounded-xl text-xs text-gray-600">
                <strong>Ưu đãi:</strong> Thiết kế hộp quà theo thương hiệu doanh nghiệp – hoàn toàn miễn phí.
              </div>

              <Link to="/"
                className="block text-center text-sm text-primary font-medium mt-4 hover:underline">
                ← Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
