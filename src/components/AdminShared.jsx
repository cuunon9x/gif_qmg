import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

export const API = import.meta.env.VITE_API_URL || 'https://admin-qmg.onrender.com'
export const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD || 'qmg2026'
export const API_KEY = import.meta.env.VITE_API_KEY || ''

export function adminHeaders(extra = {}) {
  return {
    ...(API_KEY ? { 'x-admin-api-key': API_KEY } : {}),
    ...extra,
  }
}

export async function checkApiHealth() {
  const res = await fetch(`${API}/api/health`)
  if (!res.ok) throw new Error(`Health check failed: HTTP ${res.status}`)
  const json = await res.json()
  if (!json?.ok) throw new Error('Health check response is not ok')
  return json
}

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
      const res = await fetch(`${API}/api/upload`, { method: 'POST', headers: adminHeaders(), body: fd })
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

/* ── Multi images uploader ── */
export function ImagesUploader({ value = [], onChange }) {
  const [uploading, setUploading] = useState(false)
  const [url, setUrl] = useState('')
  const fileRef = useRef()

  const images = Array.isArray(value) ? value.filter(Boolean) : []

  function setImages(next) {
    onChange(next.filter(Boolean))
  }

  async function uploadOne(file) {
    const fd = new FormData()
    fd.append('image', file)
    const res = await fetch(`${API}/api/upload`, { method: 'POST', headers: adminHeaders(), body: fd })
    const json = await res.json()
    if (!json.url) throw new Error(json.error || 'Upload failed')
    return json.url
  }

  async function handleFiles(e) {
    const files = Array.from(e.target.files || []).filter(Boolean)
    if (!files.length) return
    setUploading(true)
    try {
      const uploaded = []
      for (const f of files) {
        // sequential to avoid server overload
        // eslint-disable-next-line no-await-in-loop
        uploaded.push(await uploadOne(f))
      }
      setImages([...images, ...uploaded])
    } catch (err) {
      alert(`Upload thất bại: ${err.message}\n\nKiểm tra server đang chạy: npm run server`)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  function addUrl() {
    const v = url.trim()
    if (!v) return
    setImages([...images, v])
    setUrl('')
  }

  function removeAt(idx) {
    setImages(images.filter((_, i) => i !== idx))
  }

  function move(idx, dir) {
    const next = [...images]
    const j = idx + dir
    if (j < 0 || j >= next.length) return
    ;[next[idx], next[j]] = [next[j], next[idx]]
    setImages(next)
  }

  function setPrimary(idx) {
    if (idx <= 0) return
    const next = [...images]
    const [picked] = next.splice(idx, 1)
    next.unshift(picked)
    setImages(next)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="px-3 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-colors"
          disabled={uploading}
        >
          {uploading ? 'Đang tải...' : '+ Tải ảnh lên'}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFiles}
        />
        <div className="flex-1 min-w-[220px] flex items-center gap-2">
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            placeholder="Dán URL ảnh rồi bấm Thêm"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addUrl()
              }
            }}
          />
          <button
            type="button"
            onClick={addUrl}
            className="px-3 py-2 rounded-lg border border-gray-300 text-xs font-bold hover:border-primary hover:text-primary transition-colors"
          >
            Thêm
          </button>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center text-gray-400 text-sm">
          Chưa có ảnh. Tải ảnh lên hoặc dán URL.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
          {images.map((src, i) => (
            <div key={`${src}-${i}`} className="rounded-xl border border-gray-200 bg-white overflow-hidden">
              <div className="relative aspect-video bg-gray-50">
                <img src={src} alt="" className="w-full h-full object-cover" />
                {i === 0 && (
                  <span className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full shadow">
                    Ảnh chính
                  </span>
                )}
              </div>
              <div className="p-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-1 flex-wrap">
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    className="px-2 py-1 text-[11px] border rounded hover:border-primary hover:text-primary transition-colors disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-500"
                    disabled={i === 0}
                    title="Đưa lên"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    className="px-2 py-1 text-[11px] border rounded hover:border-primary hover:text-primary transition-colors disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-500"
                    disabled={i === images.length - 1}
                    title="Đưa xuống"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => setPrimary(i)}
                    className="px-2 py-1 text-[11px] border rounded hover:border-primary hover:text-primary transition-colors disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-500"
                    disabled={i === 0}
                    title="Đặt làm ảnh chính"
                  >
                    Ảnh chính
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  className="px-2 py-1 text-[11px] border border-red-200 text-red-500 rounded hover:bg-red-50 transition-colors self-start sm:self-auto"
                  title="Xóa ảnh"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
