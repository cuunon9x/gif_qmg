import { Link } from 'react-router-dom'

export default function MobileCatalogCTA() {
  return (
    <section className="sm:hidden py-8 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="rounded-2xl bg-primary-light border border-primary/15 p-5 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-widest text-gray-600">Sản phẩm</div>
            <div className="font-bold text-gray-800 mt-1 leading-snug">
              Xem danh mục quà tặng doanh nghiệp
            </div>
          </div>
          <Link
            to="/qua-tang-doanh-nghiep"
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-primary text-white font-bold px-5 py-2.5 text-sm"
          >
            Xem ngay
          </Link>
        </div>
      </div>
    </section>
  )
}

