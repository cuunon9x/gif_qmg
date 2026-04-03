import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { API, AdminLogin } from '../components/AdminShared'

/* ── Dashboard ── */
export default function AdminPage() {
  const [authed, setAuthed] = useState(sessionStorage.getItem('qmg_admin') === '1')
  const [stats,  setStats]  = useState({ products: null, categories: null })

  useEffect(() => {
    if (!authed) return
    Promise.all([
      fetch(`${API}/api/products`).then(r => r.json()).catch(() => []),
      fetch(`${API}/api/categories`).then(r => r.json()).catch(() => []),
    ]).then(([p, c]) => setStats({ products: p.length, categories: c.length }))
  }, [authed])

  function handleAuth() { sessionStorage.setItem('qmg_admin', '1'); setAuthed(true) }

  if (!authed) return <AdminLogin onAuth={handleAuth} />

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-2xl mx-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <Link to="/admin/products"
            className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center gap-4 hover:shadow-md hover:border-primary/40 transition-all">
            <div className="text-6xl">📦</div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors">Sản Phẩm</div>
              <div className="text-gray-400 text-sm mt-1">Thêm, sửa, xóa sản phẩm</div>
              {stats.products !== null && (
                <div className="mt-3 text-3xl font-bold text-primary">{stats.products}</div>
              )}
            </div>
            <span className="mt-auto bg-primary text-white font-bold px-6 py-2 rounded-lg group-hover:bg-primary-dark transition-colors text-sm w-full text-center">
              Quản lý →
            </span>
          </Link>

          <Link to="/admin/categories"
            className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center gap-4 hover:shadow-md hover:border-amber-400/50 transition-all">
            <div className="text-6xl">📂</div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors">Danh Mục</div>
              <div className="text-gray-400 text-sm mt-1">Thêm, sửa, xóa danh mục</div>
              {stats.categories !== null && (
                <div className="mt-3 text-3xl font-bold text-amber-500">{stats.categories}</div>
              )}
            </div>
            <span className="mt-auto bg-amber-600 text-white font-bold px-6 py-2 rounded-lg group-hover:bg-amber-700 transition-colors text-sm w-full text-center">
              Quản lý →
            </span>
          </Link>

        </div>
        <p className="text-center text-gray-400 text-xs mt-10">
          Sau khi chỉnh sửa, chạy{' '}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded">npm run build</code>{' '}
          để cập nhật website.
        </p>
      </div>
    </div>
  )
}
