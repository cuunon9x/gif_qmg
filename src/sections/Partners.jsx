import useInView from '../hooks/useInView'

export default function Partners() {
  const [ref, inView] = useInView()

  return (
    <section className="py-14 bg-white border-y border-gray-100">
      <div className="max-w-3xl mx-auto px-4">
        <div ref={ref} className={`text-center mb-6 fade-up ${inView ? 'in-view' : ''}`}>
          <span className="text-primary font-semibold text-xs uppercase tracking-widest">Khách hàng & đối tác</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-1 text-gray-800">Đồng hành cùng doanh nghiệp</h2>
          <p className="text-gray-500 text-sm mt-3 leading-relaxed">
            Danh sách logo đối tác sẽ được cập nhật trên website khi có đủ tài liệu và được phép hiển thị công khai theo checklist của khách hàng.
          </p>
        </div>
        <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/80 py-12 px-6 text-center">
          <p className="text-gray-400 text-sm font-medium">Khu vực hiển thị logo đối tác — đang cập nhật</p>
          <p className="text-gray-400 text-xs mt-2">Vui lòng gửi thư mục đối tác (partners) theo hướng dẫn triển khai.</p>
        </div>
      </div>
    </section>
  )
}
