import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { displayPrice } from '../lib/price'

export default function CartDrawer({ open, onClose }) {
  const { items, totalQty, totalPrice, formatVND, remove, updateQty } = useCart()

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-primary-light">
          <h2 className="font-bold text-gray-800 text-lg flex items-center gap-2">
            🛒 Giỏ Hàng
            {totalQty > 0 && (
              <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">{totalQty}</span>
            )}
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3">
              <div className="text-6xl">🛒</div>
              <p className="text-gray-500 text-sm">Giỏ hàng đang trống</p>
              <button onClick={onClose}
                className="text-primary text-sm font-semibold hover:underline">
                ← Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map(item => (
                <div key={item.slug} className="flex gap-4 py-3 border-b border-gray-100 last:border-0">
                  {/* Image */}
                  <Link to={`/san-pham/${item.slug}`} onClick={onClose}
                    className="shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-gray-100">
                    <img src={item.images?.[0] || item.image} alt={item.name} className="w-full h-full object-cover" />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/san-pham/${item.slug}`} onClick={onClose}>
                      <p className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 hover:text-primary transition-colors">
                        {item.name}
                      </p>
                    </Link>
                    <p className="text-primary font-bold text-sm mt-1">{displayPrice(item)}</p>

                    {/* Qty controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQty(item.slug, item.qty - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-600 font-bold transition-colors"
                        >−</button>
                        <span className="w-8 h-8 flex items-center justify-center text-sm font-semibold border-x border-gray-200">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.slug, item.qty + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-600 font-bold transition-colors"
                        >+</button>
                      </div>
                      <button
                        onClick={() => remove(item.slug)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Xóa"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-5 border-t border-gray-100 bg-white">
            {/* Subtotal */}
            <div className="flex items-center justify-between mb-1 text-sm text-gray-500">
              <span>{totalQty} sản phẩm</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-gray-800">Tổng cộng</span>
              <span className="font-extrabold text-xl text-primary">
                {totalPrice > 0 ? formatVND(totalPrice) : 'Liên hệ báo giá'}
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-4 text-center">
              * Giá chưa bao gồm phí thiết kế & vận chuyển. Sẽ xác nhận khi thanh toán.
            </p>
            <Link
              to="/checkout"
              onClick={onClose}
              className="block w-full text-center bg-primary text-white font-bold py-3 rounded-full hover:bg-primary-dark transition-colors text-sm mb-2"
            >
              Tiến Hành Đặt Hàng →
            </Link>
            <button
              onClick={onClose}
              className="block w-full text-center border border-gray-200 text-gray-600 font-medium py-2.5 rounded-full hover:bg-gray-50 transition-colors text-sm"
            >
              Tiếp Tục Mua Sắm
            </button>
          </div>
        )}
      </div>
    </>
  )
}
