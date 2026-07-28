import { Link } from 'react-router-dom'
import useInView from '../hooks/useInView'

const SERVICES = [
  { icon: '❄️', title: 'Cung cấp máy lạnh chính hãng', desc: 'Daikin, Mitsubishi, Panasonic, Toshiba, Midea và nhiều thương hiệu uy tín. Đầy đủ giấy tờ, bảo hành nhà sản xuất.' },
  { icon: '🔧', title: 'Thi công lắp đặt chuẩn HVAC', desc: 'Đội kỹ thuật viên kinh nghiệm, thi công đúng tiêu chuẩn kỹ thuật, đảm bảo an toàn, thẩm mỹ và hiệu quả vận hành.' },
  { icon: '🛠️', title: 'Bảo trì – Vệ sinh – Sửa chữa', desc: 'Dịch vụ bảo trì định kỳ, vệ sinh dàn lạnh, sửa chữa tận nơi cho nhà ở, văn phòng, nhà xưởng và công trình lớn.' },
  { icon: '📐', title: 'Tư vấn & thiết kế hệ thống', desc: 'Tư vấn giải pháp điện lạnh miễn phí, thiết kế hệ thống HVAC tối ưu cho mọi quy mô công trình.' },
]

const STEPS = [
  { num: '01', title: 'Tiếp nhận yêu cầu', desc: 'Tiếp nhận thông tin từ khách hàng, tư vấn nhu cầu sử dụng, loại công trình, diện tích và ngân sách để đưa ra giải pháp phù hợp.' },
  { num: '02', title: 'Khảo sát & Báo giá', desc: 'Kỹ thuật viên khảo sát thực tế (nếu cần), tư vấn phương án lắp đặt tối ưu và gửi báo giá chi tiết, minh bạch, không phát sinh chi phí.' },
  { num: '03', title: 'Thi công & Lắp đặt', desc: 'Tiến hành thi công theo đúng tiêu chuẩn HVAC, đảm bảo kỹ thuật, an toàn, tính thẩm mỹ và đúng tiến độ đã cam kết.' },
  { num: '04', title: 'Nghiệm thu & Bảo hành', desc: 'Kiểm tra vận hành toàn bộ hệ thống, bàn giao cho khách hàng, hướng dẫn sử dụng và kích hoạt chế độ bảo hành, bảo trì định kỳ.' },
]

const COMMITMENTS = [
  { icon: '📝', title: 'Báo giá minh bạch', desc: 'Báo giá chi tiết theo từng hạng mục, thiết bị và vật tư. Cam kết không phát sinh chi phí ngoài thỏa thuận.' },
  { icon: '✅', title: 'Thi công đúng kỹ thuật', desc: 'Đội ngũ kỹ thuật viên giàu kinh nghiệm, thi công theo tiêu chuẩn HVAC, đảm bảo an toàn và hiệu quả vận hành.' },
  { icon: '🚚', title: 'Đúng tiến độ', desc: 'Cung cấp thiết bị và hoàn thành lắp đặt đúng thời gian cam kết, đáp ứng tiến độ cho mọi công trình.' },
  { icon: '🏆', title: 'Bảo hành tận tâm', desc: 'Bảo hành chính hãng từ nhà sản xuất, hỗ trợ bảo trì định kỳ và xử lý sự cố nhanh chóng tận nơi.' },
]

const INFO_ITEMS = [
  { label: 'Tên công ty', value: 'CÔNG TY CỔ PHẦN CÔNG NGHỆ ĐIỆN LẠNH QUANG MINH GROUP' },
  { label: 'Tên viết tắt', value: 'QUANG MINH GROUP RT JSC' },
  { label: 'Mã số thuế', value: '3703185328' },
  { label: 'Địa chỉ', value: '3/49 đường Thủ Khoa Huân, Khu Phố Bình Thuận 1, Thuận An, Bình Dương' },
  { label: 'Hotline', value: '0938 777 888 – 039 750 7766' },
  { label: 'Email', value: 'quangminhgroup.hvac@gmail.com' },
  { label: 'Zalo OA', value: '039 750 7766' },
  { label: 'Giờ làm việc', value: '7:30 – 20:00 (Thứ 2 – Chủ nhật)' },
]

export default function AboutPage() {
  const [s1Ref, s1In] = useInView()
  const [s2Ref, s2In] = useInView()
  const [s3Ref, s3In] = useInView()

  return (
    <main className="pt-20 min-h-screen">

      {/* ── Hero ── */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #fff 0%, transparent 60%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div className="text-white">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-light opacity-80 mb-3 block">
              Về chúng tôi
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-5">
              Quang Minh Group<br />
              <span className="text-yellow-300">HVAC</span>
            </h1>
            <p className="text-white/85 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              Chuyên gia giải pháp điều hòa không khí &amp; HVAC — tư vấn, thiết kế, thi công và bảo trì trọn gói cho mọi công trình.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:0938777888"
                className="inline-flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-full text-sm hover:bg-primary-light transition-colors shadow">
                📞 Tư vấn miễn phí
              </a>
              <Link to="/dich-vu"
                className="inline-flex items-center gap-2 border-2 border-white/50 text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-white/10 transition-colors">
                Xem dịch vụ →
              </Link>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: '10+', label: 'Thương hiệu chính hãng' },
              { num: '500+', label: 'Công trình đã triển khai' },
              { num: '5★', label: 'Đánh giá từ khách hàng' },
              { num: '24/7', label: 'Hỗ trợ sau lắp đặt' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-white text-center">
                <div className="text-3xl font-extrabold text-yellow-300 mb-1">{s.num}</div>
                <div className="text-xs text-white/80">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About / Mission ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Sứ mệnh</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mt-2">
              QMG HVAC – Giải pháp điện lạnh toàn diện
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>
                <strong className="text-gray-800">Quang Minh Group HVAC</strong> là doanh nghiệp hoạt động trong lĩnh vực phân phối, tư vấn, thiết kế, thi công và bảo trì hệ thống điều hòa không khí cho khách hàng cá nhân, doanh nghiệp và các dự án xây dựng.
              </p>
              <p>
                Khác với mô hình cửa hàng điện lạnh truyền thống chỉ tập trung vào bán sản phẩm, Quang Minh Group hướng đến mô hình <strong className="text-primary">Solution Provider</strong> (Nhà cung cấp giải pháp tổng thể), đồng hành cùng khách hàng từ giai đoạn tư vấn, lựa chọn thiết bị, khảo sát hiện trạng, thi công lắp đặt, bảo hành, bảo trì định kỳ cho đến nâng cấp hệ thống khi phát sinh nhu cầu trong tương lai.
              </p>
              <p>
                Với phương châm <em>"Chất lượng tạo nên uy tín – Dịch vụ tạo nên niềm tin"</em>, QMG HVAC luôn đặt lợi ích của khách hàng lên hàng đầu, cam kết sử dụng sản phẩm chính hãng, quy trình thi công chuyên nghiệp, báo giá minh bạch và chế độ bảo hành chu đáo.
              </p>
            </div>

            <div className="bg-primary-light rounded-2xl p-6 space-y-3">
              {INFO_ITEMS.map((item) => (
                <div key={item.label} className="flex gap-3 text-sm">
                  <span className="font-semibold text-gray-700 shrink-0 w-28">{item.label}:</span>
                  <span className="text-gray-600">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Dịch vụ</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mt-2">Chúng tôi cung cấp</h2>
          </div>
          <div
            ref={s1Ref}
            className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 fade-up ${s1In ? 'in-view' : ''}`}
          >
            {SERVICES.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="text-4xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-gray-800 text-sm mb-2">{s.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4-step process ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Quy trình</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mt-2">4 bước triển khai</h2>
          </div>
          <div
            ref={s2Ref}
            className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 fade-up ${s2In ? 'in-view' : ''}`}
          >
            {STEPS.map((step) => (
              <div key={step.num} className="relative">
                <div className="text-5xl font-extrabold text-primary/10 mb-2 leading-none">{step.num}</div>
                <h3 className="font-bold text-gray-800 text-sm mb-2">{step.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                <div className="hidden lg:block absolute top-6 right-0 translate-x-1/2 w-6 h-px bg-primary/30 last:hidden" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Commitments ── */}
      <section className="py-16 bg-primary-light">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Cam kết</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mt-2">Tiêu chuẩn dịch vụ</h2>
          </div>
          <div
            ref={s3Ref}
            className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 fade-up ${s3In ? 'in-view' : ''}`}
          >
            {COMMITMENTS.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-3xl mb-3">{c.icon}</div>
                <h3 className="font-bold text-gray-800 text-sm mb-2">{c.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="py-16 bg-primary">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
            Bạn cần tư vấn giải pháp điện lạnh?
          </h2>
          <p className="text-white/80 text-sm mb-8 max-w-xl mx-auto">
            Chỉ cần cho chúng tôi biết nhu cầu sử dụng, diện tích công trình và ngân sách. QMG HVAC sẽ tư vấn giải pháp phù hợp, khảo sát tận nơi và gửi báo giá hoàn toàn miễn phí.
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <a href="tel:0938777888"
              className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3 rounded-full text-sm hover:bg-primary-light transition-colors shadow">
              📞 0938 777 888
            </a>
            <a href="https://zalo.me/0938777888" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 border-2 border-white/50 text-white font-bold px-8 py-3 rounded-full text-sm hover:bg-white/10 transition-colors">
              💬 Zalo ngay
            </a>
            <Link to="/dich-vu"
              className="inline-flex items-center gap-2 border-2 border-white/50 text-white font-bold px-8 py-3 rounded-full text-sm hover:bg-white/10 transition-colors">
              Xem dịch vụ →
            </Link>
          </div>
          <div className="mt-8 text-xs text-white/50 space-y-1">
            <p>📍 3/49 đường Thủ Khoa Huân, Khu Phố Bình Thuận 1, Thuận An, Bình Dương</p>
            <p>✉️ quangminhgroup.hvac@gmail.com &nbsp;·&nbsp; ⏰ 7:30–20:00 mỗi ngày</p>
          </div>
        </div>
      </section>
    </main>
  )
}
