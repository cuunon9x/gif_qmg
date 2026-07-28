import { Link } from 'react-router-dom'

const SECTIONS = [
  {
    title: '1. Sản phẩm & Dịch vụ',
    icon: '❄️',
    content: (
      <>
        <h3 className="font-semibold text-gray-800 mb-2">Giải pháp điều hòa không khí toàn diện cho mọi công trình</h3>
        <p className="mb-3">
          Quang Minh Group HVAC là đơn vị chuyên cung cấp, thiết kế, thi công và bảo trì các hệ thống điều hòa không khí – thông gió (HVAC) cho nhà ở, văn phòng, nhà xưởng, nhà hàng, khách sạn, trung tâm thương mại và các công trình công nghiệp.
        </p>
        <p>
          Với đội ngũ kỹ sư giàu kinh nghiệm cùng quy trình làm việc chuyên nghiệp, chúng tôi cam kết mang đến những giải pháp tối ưu về hiệu suất làm lạnh, tiết kiệm điện năng và vận hành bền bỉ, đáp ứng mọi nhu cầu của khách hàng.
        </p>
      </>
    ),
  },
  {
    title: '2. Đặt hàng & Xác nhận',
    icon: '📋',
    content: (
      <>
        <p className="mb-3">
          Đối với các công trình cần lắp đặt, kỹ thuật viên sẽ khảo sát thực tế (nếu cần), tư vấn phương án tối ưu và gửi báo giá chi tiết, minh bạch. Sau khi khách hàng đồng ý, QMG HVAC sẽ xác nhận đơn hàng và thống nhất thời gian giao hàng hoặc thi công.
        </p>
        <ul className="space-y-1.5">
          {[
            'Giao sản phẩm đúng chủng loại, đúng thời gian cam kết.',
            'Thi công lắp đặt theo tiêu chuẩn kỹ thuật HVAC.',
            'Kiểm tra vận hành và hướng dẫn sử dụng trước khi bàn giao.',
          ].map((t, i) => (
            <li key={i} className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span>{t}</li>
          ))}
        </ul>
      </>
    ),
  },
  {
    title: '3. Chính sách thanh toán',
    icon: '💳',
    content: (
      <>
        <p className="mb-4">Để tạo sự thuận tiện cho khách hàng, QMG HVAC hỗ trợ nhiều hình thức thanh toán.</p>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="font-semibold text-gray-800 mb-1">1. Thanh toán tiền mặt</div>
            <p>Tại văn phòng QMG HVAC hoặc tại địa điểm giao hàng / sau khi hoàn thành lắp đặt (theo thỏa thuận).</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="font-semibold text-gray-800 mb-1">2. Chuyển khoản ngân hàng</div>
            <p>Theo thông tin tài khoản được cung cấp trên báo giá hoặc hợp đồng.</p>
            <p className="mt-1 text-gray-500 italic">Nội dung chuyển khoản: Tên khách hàng – Số điện thoại – Mã đơn hàng (nếu có)</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="font-semibold text-gray-800 mb-1">3. Thanh toán theo hợp đồng</div>
            <p>Đối với dự án / công trình lớn, thanh toán theo tiến độ và điều khoản đã thống nhất trong hợp đồng.</p>
          </div>
        </div>
        <div className="mt-4 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
          <div className="font-semibold text-gray-800 mb-2">⚠️ Lưu ý khi thanh toán</div>
          <ul className="space-y-1.5">
            {[
              'Kiểm tra đầy đủ thông tin sản phẩm, số lượng và giá trị đơn hàng trước khi thanh toán.',
              'Chỉ chuyển khoản vào tài khoản chính thức do QMG HVAC cung cấp.',
              'Sau khi chuyển khoản, gửi biên lai để đơn hàng được xử lý nhanh chóng.',
              'Hóa đơn VAT sẽ được xuất theo yêu cầu theo quy định hiện hành.',
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-xs"><span className="text-yellow-600 mt-0.5">•</span>{t}</li>
            ))}
          </ul>
        </div>
      </>
    ),
  },
  {
    title: '4. Cam kết của QMG HVAC',
    icon: '🏆',
    content: (
      <ul className="space-y-2">
        {[
          'Báo giá rõ ràng, minh bạch, không phát sinh chi phí ngoài thỏa thuận.',
          'Thanh toán linh hoạt, an toàn và thuận tiện.',
          'Giao hàng đúng hẹn, thi công đúng kỹ thuật.',
          'Bảo hành chính hãng và hỗ trợ khách hàng tận tâm trong suốt quá trình sử dụng sản phẩm, dịch vụ.',
        ].map((t, i) => (
          <li key={i} className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span>{t}</li>
        ))}
      </ul>
    ),
  },
  {
    title: '5. Giao hàng & Kiểm nhận',
    icon: '🚚',
    content: (
      <ul className="space-y-2">
        {[
          'Thời gian giao hàng theo thỏa thuận từng đơn.',
          'Khách hàng cần kiểm tra sản phẩm khi nhận.',
          'Mọi khiếu nại cần được phản hồi trong vòng 24–48 giờ.',
        ].map((t, i) => (
          <li key={i} className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span>{t}</li>
        ))}
      </ul>
    ),
  },
  {
    title: '6. Đổi trả & Bảo hành',
    icon: '🔧',
    content: (
      <ul className="space-y-2">
        {[
          'Áp dụng theo chính sách đổi trả & bảo hành của Điện Lạnh QMG HVAC.',
          'QMG hỗ trợ xử lý nhanh chóng trong các trường hợp lỗi từ nhà sản xuất hoặc sai đơn hàng.',
        ].map((t, i) => (
          <li key={i} className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span>{t}</li>
        ))}
      </ul>
    ),
  },
  {
    title: '7. Giới hạn trách nhiệm',
    icon: '⚖️',
    content: (
      <ul className="space-y-2">
        {[
          'QMG không chịu trách nhiệm đối với thiệt hại phát sinh do sử dụng sản phẩm không đúng cách.',
          'Không chịu trách nhiệm với các yếu tố khách quan: thiên tai, vận chuyển chậm ngoài kiểm soát.',
        ].map((t, i) => (
          <li key={i} className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">•</span>{t}</li>
        ))}
      </ul>
    ),
  },
  {
    title: '8. Bảo mật thông tin',
    icon: '🔒',
    content: (
      <>
        <ul className="space-y-2 mb-3">
          {[
            'QMG cam kết bảo mật thông tin khách hàng.',
            'Không chia sẻ cho bên thứ ba khi chưa có sự đồng ý.',
          ].map((t, i) => (
            <li key={i} className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span>{t}</li>
          ))}
        </ul>
        <p className="text-xs text-gray-500">
          Xem thêm: <Link to="/chinh-sach-bao-mat" className="text-primary hover:underline">Chính sách bảo mật chi tiết</Link>
        </p>
      </>
    ),
  },
]

export default function PurchasePolicyPage() {
  return (
    <main className="pt-20 min-h-screen bg-white">
      {/* Header */}
      <div className="bg-primary-light border-b border-primary/10 py-10">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-primary text-xs font-bold uppercase tracking-widest">Chính sách</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-2 mb-3">
            Chính Sách Mua Hàng
          </h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl">
            Quang Minh Group HVAC cam kết mang đến dịch vụ minh bạch, chuyên nghiệp và tận tâm trong toàn bộ quy trình từ tư vấn, đặt hàng đến bảo hành sau lắp đặt.
          </p>
        </div>
      </div>

      {/* Sections */}
      <section className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {SECTIONS.map((s) => (
          <div key={s.title} className="rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-xl">{s.icon}</span>
              {s.title}
            </h2>
            <div className="text-sm text-gray-600 leading-relaxed">
              {s.content}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="rounded-2xl bg-primary text-white p-6 text-center">
          <h3 className="font-bold text-lg mb-2">Cần tư vấn thêm?</h3>
          <p className="text-sm opacity-90 mb-4">Đội ngũ QMG HVAC sẵn sàng hỗ trợ trong 5–15 phút.</p>
          <div className="flex justify-center gap-3 flex-wrap">
            <a href="tel:0938777888"
              className="inline-flex items-center gap-2 bg-white text-primary font-bold px-6 py-2.5 rounded-full text-sm hover:bg-primary-light transition-colors">
              📞 0938 777 888
            </a>
            <a href="https://zalo.me/0938777888" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-bold px-6 py-2.5 rounded-full text-sm hover:bg-white/10 transition-colors">
              💬 Zalo
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
