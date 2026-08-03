import { useState, useEffect } from 'react'
import useInView from '../hooks/useInView'
import { submitWeb3Forms } from '../lib/web3forms'

const STEPS = [
  {
    step: '01',
    icon: '📩',
    title: 'Tiếp Nhận Yêu Cầu',
    desc: 'Gọi điện hoặc nhắn Zalo để đội kỹ thuật QMG HVAC tư vấn miễn phí về loại thiết bị, công suất và giải pháp phù hợp.',
  },
  {
    step: '02',
    icon: '📍',
    title: 'Khảo Sát & Báo Giá',
    desc: 'Kỹ thuật viên khảo sát thực tế (miễn phí), lên bản vẽ mặt bằng và gửi báo giá chi tiết, minh bạch trong 24h.',
  },
  {
    step: '03',
    icon: '🛠️',
    title: 'Thi Công & Lắp Đặt',
    desc: 'Đội thi công giàu kinh nghiệm, thiết bị chính hãng, tuân thủ đúng quy trình kỹ thuật HVAC đảm bảo an toàn.',
  },
  {
    step: '04',
    icon: '✅',
    title: 'Nghiệm Thu & Bảo Hành',
    desc: 'Chạy thử, kiểm tra toàn bộ hệ thống trước bàn giao. Bảo hành theo nhà sản xuất, hỗ trợ bảo trì định kỳ.',
  },
]

const SERVICES = [
  {
    icon: '❄️',
    title: 'Cung Cấp Máy Lạnh Chính Hãng',
    desc: 'Đại lý chính hãng Daikin, Mitsubishi, Panasonic, Toshiba, LG, Samsung và nhiều thương hiệu khác. Giá cạnh tranh, bảo hành đầy đủ theo hãng.',
  },
  {
    icon: '🏗️',
    title: 'Thi Công Lắp Đặt Điều Hòa',
    desc: 'Lắp đặt điều hòa dân dụng, văn phòng, nhà xưởng, trung tâm thương mại. Đi dây, lắp đặt đúng kỹ thuật – thi công gọn gàng, sạch sẽ.',
  },
  {
    icon: '🧼',
    title: 'Bảo Trì – Vệ Sinh Định Kỳ',
    desc: 'Vệ sinh dàn lạnh, dàn nóng, kiểm tra gas, bảo dưỡng tổng thể giúp máy vận hành hiệu quả và tiết kiệm điện.',
  },
  {
    icon: '⚙️',
    title: 'Sửa Chữa & Nạp Gas',
    desc: 'Xử lý sự cố, nạp gas, thay linh kiện chính hãng. Phản hồi trong 5–15 phút, khắc phục nhanh chóng tận nơi.',
  },
  {
    icon: '🏢',
    title: 'Hệ Thống HVAC Trung Tâm',
    desc: 'Thiết kế, thi công hệ thống điều hòa trung tâm VRV/VRF cho tòa nhà, khách sạn, bệnh viện, nhà máy quy mô lớn.',
  },
  {
    icon: '🔌',
    title: 'Tủ Lạnh, Máy Giặt & Điện Lạnh',
    desc: 'Cung cấp và lắp đặt tủ lạnh, máy giặt, tivi các thương hiệu lớn. Giao hàng tận nơi, lắp đặt chuyên nghiệp.',
  },
]

const WHY = [
  {
    icon: '🏆',
    title: 'Thương Hiệu Uy Tín',
    desc: 'Hơn 10 năm kinh nghiệm trong ngành điện lạnh HVAC tại Bình Dương.',
  },
  {
    icon: '🧾',
    title: 'Chính Hãng 100%',
    desc: 'Tất cả thiết bị đều nhập từ nhà phân phối chính thức, có tem CO/CQ đầy đủ.',
  },
  {
    icon: '⚡',
    title: 'Phản Hồi Nhanh',
    desc: 'Đội kỹ thuật túc trực 24/7, tiếp nhận và xử lý yêu cầu trong vòng 15 phút.',
  },
  {
    icon: '🛡️',
    title: 'Bảo Hành Chắc Chắn',
    desc: 'Bảo hành thi công 12 tháng + bảo hành hãng lên đến 5 năm cho máy lạnh.',
  },
]

export default function ServicePage() {
  const [form, setForm] = useState({ name: '', phone: '', service: '', address: '', note: '' })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [headRef, headIn] = useInView()
  const [servicesRef, servicesIn] = useInView()
  const [stepsRef, stepsIn] = useInView()
  const [whyRef, whyIn] = useInView()
  const [formRef, formIn] = useInView()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const result = await submitWeb3Forms({
        subject: `QMG HVAC – Yêu cầu dịch vụ – ${form.name}`,
        ...form,
      })
      if (result.ok) setSent(true)
      else alert(result.message || 'Gửi thất bại. Vui lòng gọi trực tiếp 0938 777 888.')
    } catch {
      alert('Gửi thất bại. Vui lòng gọi trực tiếp 0938 777 888.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="pt-20 min-h-screen">

      {/* -- Hero -- */}
      <div className="relative bg-gradient-to-br from-gray-900 via-primary-dark to-primary overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-5 right-10 w-96 h-40 rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 py-20 text-center">
          <span className="inline-block bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            Dịch Vụ HVAC
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Giải Pháp Điện Lạnh<br className="hidden md:block" /> Toàn Diện
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Cung cấp – Lắp đặt – Bảo trì – Sửa chữa hệ thống điều hòa &amp; HVAC toàn khu vực Bình Dương và lân cận.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:0938777888"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary font-bold px-7 py-3 rounded-full hover:bg-primary-light transition-colors text-sm shadow-lg"
            >
              📞 Gọi Ngay: 0938 777 888
            </a>
            <a
              href="#dat-lich"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white font-semibold px-7 py-3 rounded-full hover:bg-white/10 transition-colors text-sm"
            >
              🗓️ Đặt Lịch Dịch Vụ
            </a>
          </div>
        </div>
      </div>

      {/* -- Services grid -- */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div ref={headRef} className={`text-center mb-12 fade-up ${headIn ? 'in-view' : ''}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Dịch Vụ Của QMG HVAC</h2>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
              Từ tư vấn, cung cấp thiết bị chính hãng đến thi công, bảo trì – QMG HVAC đồng hành cùng khách hàng trong toàn bộ vòng đời hệ thống điện lạnh.
            </p>
          </div>
          <div ref={servicesRef} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 fade-up ${servicesIn ? 'in-view' : ''}`}>
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className="group bg-gray-50 hover:bg-primary-light rounded-2xl p-6 flex gap-4 transition-colors border border-transparent hover:border-primary/20"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="text-4xl shrink-0 mt-0.5">{s.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1.5 group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- Why us -- */}
      <section className="py-14 bg-primary-light">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">Tại Sao Chọn QMG HVAC?</h2>
          <div ref={whyRef} className={`grid grid-cols-2 md:grid-cols-4 gap-5 fade-up ${whyIn ? 'in-view' : ''}`}>
            {WHY.map((w, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 text-center shadow-sm" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="text-4xl mb-3">{w.icon}</div>
                <div className="font-bold text-gray-800 text-sm mb-1.5">{w.title}</div>
                <p className="text-gray-500 text-xs leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- Process steps -- */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-3">Quy Trình Làm Việc Chuẩn HVAC</h2>
          <p className="text-gray-500 text-sm text-center mb-12">4 bước minh bạch từ tiếp nhận đến hoàn công.</p>
          <div ref={stepsRef} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 fade-up ${stepsIn ? 'in-view' : ''}`}>
            {STEPS.map((s, i) => (
              <div key={i} className="relative text-center" style={{ transitionDelay: `${i * 80}ms` }}>
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+36px)] w-full h-0.5 bg-primary/20" />
                )}
                <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-2xl mx-auto mb-4">
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

      {/* -- Contact form -- */}
      <section id="dat-lich" className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Đặt Lịch Dịch Vụ</h2>
            <p className="text-gray-500 text-sm">Điền thông tin – QMG HVAC sẽ liên hệ trong 5–15 phút.</p>
          </div>

          <div ref={formRef} className={`bg-white rounded-3xl shadow-sm border border-gray-100 p-8 fade-up ${formIn ? 'in-view' : ''}`}>
            {sent ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">Yêu cầu đã gửi!</h3>
                <p className="text-gray-500 text-sm mb-6">QMG HVAC sẽ liên hệ với bạn trong 5–15 phút.</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', phone: '', service: '', address: '', note: '' }) }}
                  className="text-sm text-primary font-semibold underline"
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Họ và tên *</label>
                    <input
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Nguyễn Văn A"
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Số điện thoại *</label>
                    <input
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="0938 777 888"
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Dịch vụ cần</label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white"
                  >
                    <option value="">-- Chọn dịch vụ --</option>
                    <option>Cung cấp máy lạnh chính hãng</option>
                    <option>Thi công lắp đặt điều hòa</option>
                    <option>Bảo trì – Vệ sinh định kỳ</option>
                    <option>Sửa chữa &amp; Nạp gas</option>
                    <option>Tư vấn hệ thống lớn (HVAC trung tâm)</option>
                    <option>Tủ lạnh / Máy giặt / Tivi</option>
                    <option>Khác</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Địa chỉ / Khu vực</label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Thuận An, Bình Dương..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Ghi chú thêm</label>
                  <textarea
                    name="note"
                    rows={3}
                    value={form.note}
                    onChange={handleChange}
                    placeholder="Mô tả thêm yêu cầu, diện tích phòng, số lượng thiết bị..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-xl bg-primary text-white font-bold py-3 text-sm hover:bg-primary-dark transition-colors disabled:opacity-60"
                >
                  {submitting ? 'Đang gửi...' : '📨 Gửi Yêu Cầu Dịch Vụ'}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  Hoặc gọi trực tiếp{' '}
                  <a href="tel:0938777888" className="text-primary font-semibold">0938 777 888</a>{' '}
                  để được hỗ trợ ngay.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

    </main>
  )
}