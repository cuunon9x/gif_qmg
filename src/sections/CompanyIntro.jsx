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
          QMG HVAC – Giải pháp điện lạnh toàn diện cho mọi công trình
        </h2>

        <div className="rounded-3xl bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: premium copy + highlights */}
            <div className="p-6 sm:p-8">
              <div className="text-gray-800">
                <p className="text-base sm:text-lg font-semibold leading-relaxed">
                  Quang Minh Group HVAC là đơn vị chuyên cung cấp máy lạnh chính hãng và giải pháp HVAC toàn diện, mang đến dịch vụ tư vấn – thiết kế – thi công – bảo trì chuyên nghiệp, giúp tối ưu hiệu quả vận hành và tiết kiệm năng lượng cho mọi công trình.
                </p>
                <p className="text-gray-600 mt-3 text-sm sm:text-[15px] leading-relaxed">
                  Khác với mô hình cửa hàng điện lạnh truyền thống, QMG HVAC hướng đến mô hình Solution Provider — đồng hành cùng khách hàng từ giai đoạn tư vấn, khảo sát, thi công lắp đặt, bảo hành, bảo trì định kỳ cho đến nâng cấp hệ thống.
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
                  <div className="mt-1 text-sm font-semibold text-gray-800">Thiết kế & Thi công</div>
                  <div className="text-xs text-gray-500 mt-1">Đảm bảo chất lượng</div>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
                  <div className="text-xs uppercase tracking-widest text-gray-500">Vận hành</div>
                  <div className="mt-1 text-sm font-semibold text-gray-800">Vận hành hiệu quả</div>
                  <div className="text-xs text-gray-500 mt-1">Hỗ trợ kỹ thuật tận nơi</div>
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
                    QMG HVAC tẬp trung kết hợp giữa thiết bị chính hãng — thi công đúng kỹ thuật — hỗ trợ kỹ thuật viên tận nơi, giúp công trình vận hành hiệu quả, bền bỉ và tiết kiệm chi phí lâu dài.
                  </p>
                  <p>
                    Danh mục thương hiệu phân phối: Daikin, Mitsubishi, Panasonic, Toshiba, Midea, Samsung, LG, Sharp, Casper và nhiều thương hiệu lớn khác.
                  </p>
                  <p>
                    Giải pháp toàn diện từ máy lạnh dân dụng đến hệ thống điều hòa trung tâm cho các công trình quy mô lớn.
                  </p>
                </div>

                {!expanded && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white to-white/0" />
                )}
              </div>

              <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-primary font-semibold text-sm text-center sm:text-left">
                  Giải Pháp Điện Lạnh Toàn Diện – Tối ưu – Bền Vững
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
                style={{ backgroundImage: 'radial-gradient(circle, #0057A8 1px, transparent 1px)', backgroundSize: '28px 28px' }}
              />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-xs text-white/90">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Chuyên gia HVAC & điện lạnh
                </div>

                <h3 className="mt-4 text-white text-xl sm:text-2xl font-extrabold leading-snug">
                  Thi công chuẩn kỹ thuật.<br />Đội ngũ hỗ trợ tận tâm.
                </h3>
                <p className="mt-3 text-white/70 text-sm leading-relaxed">
                  Khảo sát thực tế, báo giá minh bạch, thi công đúng tiến độ và bảo hành chính hãng.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    { k: 'Thương hiệu', v: 'Chính hãng 100%' },
                    { k: 'Báo giá', v: '5–15 phút' },
                    { k: 'Khu vực', v: 'Bình Dương & TP.HCM' },
                    { k: 'Hỗ trợ', v: 'T2–CN' },
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
