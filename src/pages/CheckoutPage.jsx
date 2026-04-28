import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import useInView from '../hooks/useInView'
import { submitWeb3Forms } from '../lib/web3forms'

export default function CheckoutPage() {
  const { items, totalQty, totalPrice, formatVND, clear } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', phone: '', email: '', company: '', address: '', note: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [ref, inView] = useInView()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  // Redirect if cart empty and not placed
  useEffect(() => {
    if (!done && items.length === 0) navigate('/', { replace: true })
  }, [items, done, navigate])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const orderLines = items.map(i => `• ${i.name} x${i.qty} — ${i.price}`).join('\n')
    const total = totalPrice > 0 ? `Tổng: ${formatVND(totalPrice)}` : 'Tổng: Liên hệ báo giá'

    try {
      const { ok, message } = await submitWeb3Forms({
        subject: `🛒 Đơn hàng mới – ${form.name} (${form.phone})`,
        order_items: orderLines,
        order_total: total,
        ...form,
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
          <h1 className="text-2xl font-extrabold text-gray-800 mb-3">Đặt Hàng Thành Công!</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Cảm ơn bạn đã đặt hàng. Đội ngũ QMG Gift sẽ liên hệ xác nhận đơn và báo giá chi tiết trong vòng 30 phút làm việc.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/"
              className="bg-primary text-white font-bold px-7 py-3 rounded-full hover:bg-primary-dark transition-colors text-sm">
              Về Trang Chủ
            </Link>
            <a href="tel:0909123456"
              className="border border-primary text-primary font-semibold px-7 py-3 rounded-full hover:bg-primary-light transition-colors text-sm">
              📞 Gọi Ngay
            </a>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-20 min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      {/* <div className="bg-primary-light py-3 px-4">
        <div className="max-w-6xl mx-auto text-xs text-gray-500 flex items-center gap-1.5">
          <Link to="/" className="hover:text-primary">Trang Chủ</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium">Đặt Hàng</span>
        </div>
      </div> */}

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-extrabold text-gray-800 mb-8">Xác Nhận Đơn Hàng</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div ref={ref} className={`lg:col-span-3 fade-up ${inView ? 'in-view' : ''}`}>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-700 text-base mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">1</span>
                Thông Tin Liên Hệ
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
                      placeholder="0909 xxx xxx"
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
                    {loading ? 'Đang gửi đơn...' : '🎁 Xác Nhận Đặt Hàng'}
                  </button>
                  <p className="text-xs text-gray-400 text-center mt-2">
                    Nhân viên sẽ gọi xác nhận & báo giá chi tiết trong 30 phút.
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="font-bold text-gray-700 text-base mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">2</span>
                Đơn Hàng ({totalQty} sản phẩm)
              </h2>

              <div className="flex flex-col gap-4 mb-5">
                {items.map(item => (
                  <div key={item.slug} className="flex gap-3 items-start">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
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
                ✨ <strong>Ưu đãi:</strong> Thiết kế hộp quà theo thương hiệu doanh nghiệp – hoàn toàn miễn phí.
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
