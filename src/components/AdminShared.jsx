import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

export const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'
export const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD || 'qmg2026'

export function slugify(str) {
  return str.toLowerCase()
    .replace(/đ/g, 'd').replace(/Đ/g, 'd')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

/* ── Login ── */
export function AdminLogin({ onAuth }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)
  function submit(e) { e.preventDefault(); pw === ADMIN_PASS ? onAuth() : (setErr(true), setPw('')) }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={submit} className="bg-white rounded-2xl shadow-lg p-10 w-80">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">🔐</div>
          <h1 className="text-xl font-bold text-gray-800">QMG Admin</h1>
          <p className="text-gray-400 text-sm mt-1">Nhập mật khẩu để tiếp tục</p>
        </div>
        <input type="password" value={pw} onChange={e => { setPw(e.target.value); setErr(false) }}
          placeholder="Mật khẩu" autoFocus
          className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary mb-3 ${err ? 'border-red-400' : 'border-gray-300'}`} />
        {err && <p className="text-red-500 text-xs mb-3">Mật khẩu không đúng</p>}
        <button type="submit" className="w-full bg-primary text-white font-bold py-2.5 rounded-lg hover:bg-primary-dark transition-colors">
          Đăng Nhập
        </button>
      </form>
    </div>
  )
}

/* ── Breadcrumb nav ── */
export function AdminNav({ title }) {
  return (
    <div className="bg-white border-b px-6 py-4 flex items-center justify-between mt-32">
      <div className="hidden md:flex items-center gap-2 text-sm">
        <Link to="/admin" className="font-bold text-primary hover:underline">QMG Admin</Link>
        <span className="text-gray-300 mx-1">/</span>
        <span className="font-semibold text-gray-700">{title}</span>
      </div>
      <Link to="/admin" className="text-sm px-3 py-1.5 rounded-lg border bg-primary border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
        ← Về trang Admin
      </Link>
    </div>
  )
}

/* ── Image uploader ── */
export function ImageUploader({ value, onChange }) {
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef()

  async function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('image', file)
    try {
      const res = await fetch(`${API}/api/upload`, { method: 'POST', body: fd })
      const json = await res.json()
      if (json.url) onChange(json.url)
      else throw new Error(json.error)
    } catch (err) {
      alert(`Upload thất bại: ${err.message}\n\nKiểm tra server đang chạy: npm run server`)
    }
    setUploading(false)
  }

  return (
    <div className="space-y-2">
      <div onClick={() => fileRef.current.click()}
        className="relative w-full aspect-video rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden bg-gray-50 hover:border-primary transition-colors">
        {value
          ? <img src={value} alt="" className="w-full h-full object-cover" />
          : <div className="text-center text-gray-400 text-sm p-4"><div className="text-3xl mb-1">📷</div>Click để tải ảnh lên</div>}
        {uploading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <span className="text-primary font-semibold text-sm">Đang tải...</span>
          </div>
        )}
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      <input
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
        placeholder="Hoặc nhập URL ảnh" value={value} onChange={e => onChange(e.target.value)} />
    </div>
  )
}
