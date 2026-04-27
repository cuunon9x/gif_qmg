import { useState, useEffect } from 'react'
import { API, AdminLogin, AdminNav, ImageUploader, slugify, adminHeaders } from '../components/AdminShared'

const PRODUCT_CATS = [
  { value: 'qua-tet',        label: 'Quà Tết' },
  { value: 'banh-trung-thu', label: 'Bánh Trung Thu' },
  { value: 'san-pham-khac',  label: 'Sản Phẩm Khác' },
]

const EMPTY_PRODUCT = {
  id: null, slug: '', name: '', price: '', priceNum: 0,
  category: 'qua-tet', subcat: '', subcatLabel: '', featured: false,
  image: '', badge: '', description: '', contents: '', minOrder: 50,
  lead: '', tags: '',
}

function toProductForm(p) {
  return { ...p, contents: Array.isArray(p.contents) ? p.contents.join('\n') : '', tags: Array.isArray(p.tags) ? p.tags.join(', ') : '', badge: p.badge ?? '' }
}

function fromProductForm(f, existing) {
  const id   = f.id || (Math.max(0, ...existing.map(p => p.id)) + 1)
  const slug = f.slug.trim() || slugify(f.name)
  return { ...f, id, slug, priceNum: Number(f.priceNum) || 0, minOrder: Number(f.minOrder) || 0, badge: f.badge.trim() || null, contents: f.contents.split('\n').map(s => s.trim()).filter(Boolean), tags: f.tags.split(',').map(s => s.trim()).filter(Boolean), images: f.image ? [f.image] : [] }
}

/* ── Product list ── */
function ProductList({ products, categories, loading, onAdd, onEdit, onDelete }) {
  const [filterCat, setFilterCat] = useState('all')
  const catList = categories.filter(c => !c.isService).length
    ? categories.filter(c => !c.isService)
    : PRODUCT_CATS.map(c => ({ slug: c.value, label: c.label }))
  const visible = filterCat === 'all' ? products : products.filter(p => p.category === filterCat)
  return (
    <div className="max-w-6xl mx-auto p-6 mt-3">
      <div className="flex items-center justify-between mb-5 mt-3 flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          {[{ slug: 'all', label: 'Tất cả' }, ...catList].map(c => (
            <button key={c.slug} onClick={() => setFilterCat(c.slug)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${filterCat === c.slug ? 'bg-primary text-white border-primary' : 'border-gray-300 text-gray-600 hover:border-primary hover:text-primary'}`}>
              {c.icon ? `${c.icon} ` : ''}{c.label}
            </button>
          ))}
        </div>
        <button onClick={onAdd} className="bg-primary text-white font-bold px-5 py-2 rounded-lg hover:bg-primary-dark transition-colors text-sm">
          + Thêm Sản Phẩm
        </button>
      </div>
      {loading ? (
        <div className="text-center py-20 text-gray-400"><div className="text-3xl mb-3">⏳</div><p>Đang tải... (đảm bảo server đang chạy: <code>npm run server</code>)</p></div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 w-16">Ảnh</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Tên sản phẩm</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Danh mục</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Giá</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">Nổi bật</th>
                <th className="w-28"></th>
              </tr>
            </thead>
            <tbody>
              {visible.map((p, i) => (
                <tr key={p.id} className={`border-b last:border-0 ${i % 2 ? 'bg-gray-50/50' : ''}`}>
                  <td className="px-4 py-3">
                    <img src={p.image} alt="" className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                      onError={e => { e.target.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><rect fill='%23f3f4f6' width='48' height='48'/></svg>" }} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-800">{p.name}</div>
                    {p.badge && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{p.badge}</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{(categories.find(c => c.slug === p.category) ?? PRODUCT_CATS.find(c => c.value === p.category))?.label}</td>
                  <td className="px-4 py-3 font-semibold text-primary text-xs">{p.price}</td>
                  <td className="px-4 py-3 text-center">{p.featured ? '⭐' : '—'}</td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <button onClick={() => onEdit(p)} className="text-blue-500 hover:underline font-medium">Sửa</button>
                    <button onClick={() => onDelete(p.id)} className="text-red-400 hover:underline font-medium">Xóa</button>
                  </td>
                </tr>
              ))}
              {visible.length === 0 && <tr><td colSpan={6} className="text-center py-12 text-gray-400">Không có sản phẩm</td></tr>}
            </tbody>
          </table>
        </div>
      )}
      <p className="text-gray-400 text-xs mt-6 text-center">Sau khi lưu, chạy <code className="bg-gray-100 px-1.5 py-0.5 rounded">npm run build</code> để cập nhật website.</p>
    </div>
  )
}

/* ── Product form ── */
function ProductForm({ product, allProducts, categories, onSave, onCancel }) {
  const isNew = !product.id
  const [form, setForm] = useState(isNew ? { ...EMPTY_PRODUCT } : toProductForm(product))
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const inp   = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary'
  const label = 'block text-xs font-semibold text-gray-600 mb-1'
  const catOpts = categories.filter(c => !c.isService).length
    ? categories.filter(c => !c.isService).map(c => ({ value: c.slug, label: `${c.icon ? c.icon + ' ' : ''}${c.label}` }))
    : PRODUCT_CATS
  function set(k, v) { setForm(f => ({ ...f, [k]: v })) }
  function showToast(msg) { setToast(msg); setTimeout(() => setToast(''), 2500) }
  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    await onSave(fromProductForm(form, allProducts))
    setSaving(false)
    showToast('✅ Đã lưu!')
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav title="📦 Sản Phẩm" />
      {toast && <div className="fixed top-5 right-5 bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg z-50">{toast}</div>}
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-3">
          <label className={label}>Ảnh sản phẩm</label>
          <ImageUploader value={form.image} onChange={v => set('image', v)} />
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2"><label className={label}>Tên sản phẩm *</label><input required className={inp} value={form.name} onChange={e => set('name', e.target.value)} /></div>
          <div><label className={label}>Giá hiển thị</label><input className={inp} placeholder="690.000 ₫ hoặc Liên hệ" value={form.price} onChange={e => set('price', e.target.value)} /></div>
          <div><label className={label}>Giá số (để sắp xếp)</label><input type="number" className={inp} min={0} value={form.priceNum} onChange={e => set('priceNum', e.target.value)} /></div>
          <div><label className={label}>Danh mục *</label>
            <select required className={inp} value={form.category} onChange={e => set('category', e.target.value)}>
              {catOpts.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div><label className={label}>Badge nhãn</label><input className={inp} placeholder="Bán chạy / Premium..." value={form.badge} onChange={e => set('badge', e.target.value)} /></div>
          <div><label className={label}>Danh mục con (slug)</label><input className={inp} placeholder="hop-qua / gio-qua" value={form.subcat} onChange={e => set('subcat', e.target.value)} /></div>
          <div><label className={label}>Tên danh mục con</label><input className={inp} placeholder="Hộp Quà Tết..." value={form.subcatLabel} onChange={e => set('subcatLabel', e.target.value)} /></div>
          <div><label className={label}>Đặt hàng tối thiểu</label><input type="number" className={inp} min={1} value={form.minOrder} onChange={e => set('minOrder', e.target.value)} /></div>
          <div><label className={label}>Thời gian giao hàng</label><input className={inp} placeholder="5-7 ngày làm việc" value={form.lead} onChange={e => set('lead', e.target.value)} /></div>
          <div><label className={label}>Slug URL (tự tạo nếu trống)</label><input className={inp} placeholder="hop-qua-tet-phu-quy" value={form.slug} onChange={e => set('slug', e.target.value)} /></div>
          <div className="flex items-center gap-2 pt-5">
            <input type="checkbox" id="featured" checked={form.featured} onChange={e => set('featured', e.target.checked)} className="w-4 h-4 accent-primary" />
            <label htmlFor="featured" className="text-sm font-semibold text-gray-700 cursor-pointer">⭐ Sản phẩm nổi bật</label>
          </div>
          <div className="sm:col-span-2"><label className={label}>Mô tả ngắn</label><textarea rows={3} className={inp} value={form.description} onChange={e => set('description', e.target.value)} /></div>
          <div className="sm:col-span-2"><label className={label}>Thành phần (mỗi dòng một mục)</label><textarea rows={5} className={inp} placeholder={'Giỏ mây cao cấp\nRượu vang 750ml\n...'} value={form.contents} onChange={e => set('contents', e.target.value)} /></div>
          <div className="sm:col-span-2"><label className={label}>Tags (phân cách bằng dấu phẩy)</label><input className={inp} placeholder="sang trọng, VIP..." value={form.tags} onChange={e => set('tags', e.target.value)} /></div>
          <div className="sm:col-span-2 flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="bg-primary text-white font-bold px-8 py-2.5 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50">
              {saving ? 'Đang lưu...' : '💾 Lưu Sản Phẩm'}
            </button>
            <button type="button" onClick={onCancel} className="border border-gray-300 text-gray-600 font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">Hủy</button>
          </div>
        </div>
      </form>
    </div>
  )
}

/* ── Main ── */
export default function AdminProductsPage() {
  const [authed,     setAuthed]     = useState(sessionStorage.getItem('qmg_admin') === '1')
  const [products,   setProducts]   = useState([])
  const [categories, setCategories] = useState([])
  const [editing,    setEditing]    = useState(null)
  const [loading,    setLoading]    = useState(false)

  useEffect(() => { if (authed) { loadProducts(); loadCategories() } }, [authed])

  async function loadProducts() {
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/products`, { headers: adminHeaders() })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setProducts(await res.json())
    } catch {
      alert('❌ Không kết nối được server.\n\nMở terminal và chạy:\n  npm run server')
    }
    setLoading(false)
  }

  async function loadCategories() {
    try {
      const res = await fetch(`${API}/api/categories`, { headers: adminHeaders() })
      if (res.ok) setCategories(await res.json())
    } catch { /* silent */ }
  }

  async function handleSave(product) {
    const updated = product.id && products.some(p => p.id === product.id)
      ? products.map(p => p.id === product.id ? product : p)
      : [...products, product]
    const res = await fetch(`${API}/api/products`, {
      method: 'PUT',
      headers: adminHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(updated),
    })
    if (res.ok) { setProducts(updated); setEditing(null) }
    else alert('Lưu thất bại – kiểm tra server')
  }

  async function handleDelete(id) {
    const p = products.find(pr => pr.id === id)
    if (!confirm(`Xóa sản phẩm "${p?.name}"?`)) return
    const updated = products.filter(pr => pr.id !== id)
    const res = await fetch(`${API}/api/products`, {
      method: 'PUT',
      headers: adminHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(updated),
    })
    if (res.ok) setProducts(updated)
    else alert('Xóa thất bại – kiểm tra server')
  }

  function handleAuth() { sessionStorage.setItem('qmg_admin', '1'); setAuthed(true) }

  if (!authed) return <AdminLogin onAuth={handleAuth} />

  if (editing !== null) return (
    <ProductForm product={editing} allProducts={products} categories={categories} onSave={handleSave} onCancel={() => setEditing(null)} />
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav title="📦 Sản Phẩm" />
      <ProductList
        products={products} categories={categories} loading={loading}
        onAdd={() => setEditing({ ...EMPTY_PRODUCT })}
        onEdit={p => setEditing({ ...p })}
        onDelete={handleDelete}
      />
    </div>
  )
}
