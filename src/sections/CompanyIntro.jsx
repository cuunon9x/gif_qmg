import { useState } from 'react'
import useInView from '../hooks/useInView'

export default function CompanyIntro() {
  const [ref, inView] = useInView()
  const [expanded, setExpanded] = useState(false)

  return (
    <section className="py-16 bg-gray-50 border-y border-gray-100">
      <div ref={ref} className={`max-w-3xl mx-auto px-4 fade-up ${inView ? 'in-view' : ''}`}>
        <p className="text-primary font-semibold text-xs uppercase tracking-widest text-center mb-2">Giới thiệu công ty</p>
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
          QMG – Giải pháp quà tặng chuyên nghiệp cho doanh nghiệp
        </h2>

        <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-6 sm:p-8">
          <div className="text-gray-700 text-[15px] leading-relaxed">
            <p className="text-base sm:text-[15px] font-medium text-gray-800">
              QMG mang đến giải pháp quà tặng doanh nghiệp in logo theo nhận diện thương hiệu – từ thiết kế sáng tạo đến sản phẩm chất lượng, giao hàng đúng hẹn.
            </p>
            <p className="text-gray-600 mt-3">
              Bên cạnh đó, QMG còn cung cấp dòng thực phẩm dinh dưỡng lành mạnh từ AB Nutrition – phù hợp cho lối sống khỏe.
            </p>
          </div>

          <div className={`relative mt-5 ${expanded ? '' : 'max-h-40 overflow-hidden'}`}>
            <div className="text-gray-600 space-y-4 text-[15px] leading-relaxed">
              <p>
                QMG ra đời với sứ mệnh mang đến những giải pháp quà tặng mang đậm dấu ấn thương hiệu, kết hợp giữa thiết kế sáng tạo và chất lượng sản phẩm. Mỗi sản phẩm tại QMG không chỉ đẹp về hình thức mà còn được tối ưu để truyền tải thông điệp thương hiệu một cách hiệu quả nhất.
              </p>
              <p>
                QMG chuyên cung cấp các sản phẩm quà tặng doanh nghiệp như ly giữ nhiệt, dù, sổ tay, giftset cao cấp… với dịch vụ thiết kế & in logo theo yêu cầu, giúp thương hiệu của bạn xuất hiện nổi bật và chuyên nghiệp hơn trong mọi dịp.
              </p>
              <p>
                Chúng tôi tập trung vào việc kết hợp giữa thiết kế sáng tạo – chất lượng sản phẩm – trải nghiệm người nhận, để mỗi sản phẩm không chỉ đẹp mà còn mang ý nghĩa và giá trị lâu dài.
              </p>
              <p>
                Bên cạnh các giải pháp quà tặng, QMG còn cung cấp các dòng thực phẩm bổ sung thể thao đến từ thương hiệu AB Nutrition – đơn vị uy tín trong lĩnh vực dinh dưỡng dành cho người vận động và lối sống lành mạnh.
              </p>
              <p>
                Các sản phẩm của AB Nutrition như granola, ngũ cốc dinh dưỡng, thực phẩm healthy được lựa chọn kỹ lưỡng, phù hợp cho người tập luyện thể thao, dân văn phòng và những ai theo đuổi chế độ eat clean – sống khỏe.
              </p>
              <p>
                Sự kết hợp giữa quà tặng doanh nghiệp và thực phẩm dinh dưỡng giúp QMG mang đến giải pháp quà tặng toàn diện, vừa thiết thực vừa nâng cao giá trị trải nghiệm cho người nhận.
              </p>
            </div>

            {!expanded && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-white/0" />
            )}
          </div>

          <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-primary font-semibold text-sm text-center sm:text-left">
              QMG – Trao Yêu Thương, Nhận Hạnh Phúc
            </p>
            <button
              type="button"
              onClick={() => setExpanded(v => !v)}
              className="inline-flex items-center justify-center rounded-full border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-700 hover:border-primary hover:text-primary hover:bg-primary-light transition-colors w-full sm:w-auto"
              aria-expanded={expanded}
            >
              {expanded ? 'Thu gọn' : 'Xem thêm'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
