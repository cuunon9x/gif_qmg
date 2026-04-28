import { useState } from 'react'
import useInView from '../hooks/useInView'

export default function CompanyIntro() {
  const [ref, inView] = useInView()
  const [expanded, setExpanded] = useState(false)

  return (
    <section className="py-16 bg-gray-50 border-y border-gray-100">
      <div ref={ref} className={`max-w-6xl mx-auto px-4 fade-up ${inView ? 'in-view' : ''}`}>
        <p className="text-primary font-semibold text-xs uppercase tracking-widest text-center mb-2">Giới thiệu công ty</p>
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
          QMG – Giải pháp quà tặng chuyên nghiệp cho doanh nghiệp
        </h2>

        <div className="rounded-3xl bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: premium copy + highlights */}
            <div className="p-6 sm:p-8">
              <div className="text-gray-800">
                <p className="text-base sm:text-lg font-semibold leading-relaxed">
                  Quang Minh Gift (QMG) cung cấp giải pháp quà tặng doanh nghiệp in logo theo nhận diện thương hiệu — thiết kế chỉn chu, sản phẩm chất lượng và giao hàng đúng hẹn.
                </p>
                <p className="text-gray-600 mt-3 text-sm sm:text-[15px] leading-relaxed">
                  Đồng thời, QMG phân phối dòng dinh dưỡng lành mạnh từ AB Nutrition, phù hợp cho chương trình chăm sóc sức khỏe nội bộ và quà tặng đối tác.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
                  <div className="text-xs uppercase tracking-widest text-gray-500">Cam kết</div>
                  <div className="mt-1 text-sm font-semibold text-gray-800">Phản hồi 5–15 phút</div>
                  <div className="text-xs text-gray-500 mt-1">Khung giờ 7h30–17h</div>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
                  <div className="text-xs uppercase tracking-widest text-gray-500">Dịch vụ</div>
                  <div className="mt-1 text-sm font-semibold text-gray-800">Thiết kế & in logo</div>
                  <div className="text-xs text-gray-500 mt-1">Đồng bộ nhận diện thương hiệu</div>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
                  <div className="text-xs uppercase tracking-widest text-gray-500">Vận hành</div>
                  <div className="mt-1 text-sm font-semibold text-gray-800">Giao hàng đúng hẹn</div>
                  <div className="text-xs text-gray-500 mt-1">Theo thỏa thuận từng đơn</div>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
                  <div className="text-xs uppercase tracking-widest text-gray-500">Pháp lý</div>
                  <div className="mt-1 text-sm font-semibold text-gray-800">MST 3703185328</div>
                  <div className="text-xs text-gray-500 mt-1">Bình Dương</div>
                </div>
              </div>

              <div className={`relative mt-6 ${expanded ? '' : 'max-h-28 overflow-hidden'}`}>
                <div className="text-gray-600 text-sm leading-relaxed space-y-3">
                  <p>
                    QMG tập trung kết hợp giữa thiết kế sáng tạo — chất lượng sản phẩm — trải nghiệm người nhận, giúp quà tặng vừa đẹp vừa truyền tải thông điệp thương hiệu hiệu quả.
                  </p>
                  <p>
                    Danh mục phổ biến gồm ly giữ nhiệt, dù, sổ tay, giftset cao cấp… và các sản phẩm dinh dưỡng healthy từ AB Nutrition.
                  </p>
                  <p>
                    Giải pháp “quà tặng + dinh dưỡng” giúp doanh nghiệp có lựa chọn linh hoạt cho các dịp tri ân, sự kiện và chương trình chăm sóc nội bộ.
                  </p>
                </div>

                {!expanded && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white to-white/0" />
                )}
              </div>

              <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-primary font-semibold text-sm text-center sm:text-left">
                  Trao Yêu Thương, Nhận Hạnh Phúc
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

            {/* Right: visual card */}
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 sm:p-8 lg:border-l border-white/10">
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle, #C5A059 1px, transparent 1px)', backgroundSize: '28px 28px' }}
              />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-xs text-white/90">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Premium corporate gifting
                </div>

                <h3 className="mt-4 text-white text-xl sm:text-2xl font-extrabold leading-snug">
                  Thiết kế đồng bộ nhận diện.<br />Trải nghiệm quà tặng chỉn chu.
                </h3>
                <p className="mt-3 text-white/70 text-sm leading-relaxed">
                  Tư vấn nhanh, mockup rõ ràng, sản xuất theo tiêu chuẩn và bàn giao đúng tiến độ.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    { k: 'Thiết kế', v: 'Miễn phí' },
                    { k: 'Báo giá', v: '5–15 phút' },
                    { k: 'Khu vực', v: 'Toàn quốc' },
                    { k: 'Hỗ trợ', v: 'T2–T7' },
                  ].map((x) => (
                    <div key={x.k} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                      <div className="text-[11px] uppercase tracking-widest text-white/60">{x.k}</div>
                      <div className="mt-1 text-white font-bold">{x.v}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:0938777888"
                    className="inline-flex items-center justify-center rounded-full bg-primary text-white font-bold px-6 py-3 text-sm hover:bg-primary-dark transition-colors"
                  >
                    Liên hệ tư vấn
                  </a>
                  <a
                    href="https://zalo.me/0938777888"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-white/20 text-white font-semibold px-6 py-3 text-sm hover:bg-white/10 transition-colors"
                  >
                    Chat Zalo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
