import { useState, useEffect, useMemo } from 'react'
import { API, AdminLogin, AdminNav, ImageUploader, slugify, adminHeaders, checkApiHealth } from '../components/AdminShared'

const COLOR_PRESETS = [
  { label: 'Đỏ Tết',     value: 'from-red-700 to-red-500' },
  { label: 'Vàng',       value: 'from-amber-600 to-yellow-500' },
  { label: 'Tím hồng',   value: 'from-purple-700 to-pink-500' },
  { label: 'Xanh lá',    value: 'from-green-700 to-green-500' },
  { label: 'Xanh dương', value: 'from-blue-700 to-blue-500' },
  { label: 'Vàng gold',  value: 'from-primary to-primary-dark' },
]

const EMPTY_CAT = {
  slug: '', label: '', shortLabel: '', description: '',
  icon: '', image: '', color: 'from-red-700 to-red-500',
  count: '', isService: false,
}

const EMPTY_SUB = {
  slug: '', label: '', parentSlug: '', icon: '', image: '', order: '',
}

function toCatForm(c) {
  return { ...c, count: c.count ?? '', isService: c.isService ?? false }
}

function fromCatForm(f) {
  return {
    ...f,
    slug: f.slug.trim() || slugify(f.label),
    count: f.count === '' ? null : Number(f.count),
    isService: Boolean(f.isService),
  }
}

function fromSubForm(f) {
  return {
    ...f,
    slug: f.slug.trim() || slugify(f.label),
    order: f.order === '' ? null : Number(f.order),
  }
}

/* ── Sortable column header ── */
function SortTh({ sortKey, current, dir, onSort, className = '', children }) {
  const active = current === sortKey
  return (
    <th
      className={`px-4 py-3 font-semibold text-gray-600 cursor-pointer select-none hover:text-primary transition-colors ${className}`}
      onClick={() => onSort(sortKey)}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        <span className="text-[10px] leading-none">
          {active ? (dir === 'asc' ? '▲' : '▼') : <span className="opacity-30">⇅</span>}
        </span>
      </span>
    </th>
  )
}

/* ── Category list ── */
function CategoryList({ categories, loading, onAdd, onEdit, onDelete }) {
  const [sortKey, setSortKey] = useState('label')
  const [sortDir, setSortDir] = useState('asc')

  function handleSort(key) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const sorted = useMemo(() => {
    return [...categories].sort((a, b) => {
      let av = a[sortKey] ?? ''
      let bv = b[sortKey] ?? ''
      if (sortKey === 'count') { av = Number(av) || 0; bv = Number(bv) || 0 }
      else { av = String(av).toLowerCase(); bv = String(bv).toLowerCase() }
      if (av < bv) return sortDir === 'asc' ? -1 : 1
      if (av > bv) return sortDir === 'asc' ? 1 : -1
      return 0
    })
  }, [categories, sortKey, sortDir])

  return (
    <div className="max-w-6xl mx-auto p-6 mt-3">
      <div className="flex justify-between items-center mb-5 mt-3">
        <p className="text-sm text-gray-500">{categories.length} danh mục</p>
        <button onClick={onAdd}
          className="bg-primary text-white font-bold px-5 py-2 rounded-lg hover:bg-primary-dark transition-colors text-sm">
          + Thêm Danh Mục
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-3xl mb-3">⏳</div>
          <p>Đang tải... (đảm bảo server đang chạy: <code>npm run server</code>)</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-auto">
          <table className="w-full text-sm min-w-[540px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 w-16">Ảnh</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 w-14">Icon</th>
                <SortTh sortKey="label" current={sortKey} dir={sortDir} onSort={handleSort} className="text-left">Tên danh mục</SortTh>
                <SortTh sortKey="slug"  current={sortKey} dir={sortDir} onSort={handleSort} className="text-left">Slug</SortTh>
                <SortTh sortKey="count" current={sortKey} dir={sortDir} onSort={handleSort} className="text-center">Số SP</SortTh>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">Dịch vụ</th>
                <th className="w-28"></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((c, i) => (
                <tr key={c.slug} className={`border-b last:border-0 ${i % 2 ? 'bg-gray-50/50' : ''}`}>
                  <td className="px-4 py-3">
                    <img src={c.image || ''} alt="" className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                      onError={e => { e.target.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><rect fill='%23f3f4f6' width='48' height='48'/></svg>" }} />
                  </td>
                  <td className="px-4 py-3 text-2xl">{c.icon}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-800">{c.label}</div>
                    {c.shortLabel && <div className="text-xs text-gray-400">{c.shortLabel}</div>}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs font-mono">{c.slug}</td>
                  <td className="px-4 py-3 text-center text-gray-600">{c.count ?? '—'}</td>
                  <td className="px-4 py-3 text-center">{c.isService ? '✅' : '—'}</td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <button onClick={() => onEdit(c)} className="text-blue-500 hover:underline font-medium">Sửa</button>
                    <button onClick={() => onDelete(c.slug)} className="text-red-400 hover:underline font-medium">Xóa</button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr><td colSpan={7} className="text-center py-16 text-gray-400">
                  <div className="text-4xl mb-3">📂</div>
                  <p>Chưa có danh mục nào. Nhấn <strong>+ Thêm Danh Mục</strong> để bắt đầu.</p>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

/* ── Category form ── */
function CategoryForm({ category, onSave, onCancel }) {
  const isNew = !category.slug
  const originalSlug = isNew ? null : category.slug
  const [form, setForm] = useState(isNew ? { ...EMPTY_CAT } : toCatForm(category))
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const inp   = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary'
  const label = 'block text-xs font-semibold text-gray-600 mb-1'
  function set(k, v) { setForm(f => ({ ...f, [k]: v })) }
  function showToast(msg) { setToast(msg); setTimeout(() => setToast(''), 2500) }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    await onSave(fromCatForm(form), originalSlug)
    setSaving(false)
    showToast(isNew ? '✅ Đã thêm danh mục!' : '✅ Đã lưu!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav title="📂 Danh Mục" />
      {toast && (
        <div className="fixed top-5 right-5 bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg z-50">
          {toast}
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">

        <div className="sm:col-span-2">
          <label className={label}>Ảnh danh mục</label>
          <ImageUploader value={form.image} onChange={v => set('image', v)} />
        </div>

        <div className="sm:col-span-2">
          <label className={label}>Tên danh mục *</label>
          <input required className={inp} placeholder="Ví dụ: Valentine, Ngày Độc Lập..."
            value={form.label} onChange={e => set('label', e.target.value)} />
        </div>

        <div>
          <label className={label}>Tên ngắn</label>
          <input className={inp} placeholder="Valentine" value={form.shortLabel} onChange={e => set('shortLabel', e.target.value)} />
        </div>
        <div>
          <label className={label}>Slug URL (tự tạo nếu trống)</label>
          <input className={inp} placeholder="valentine" value={form.slug} onChange={e => set('slug', e.target.value)} />
        </div>

        <div>
          <label className={label}>Icon (emoji)</label>
          <input className={inp} placeholder="💝" value={form.icon} onChange={e => set('icon', e.target.value)} />
        </div>
        <div>
          <label className={label}>Số sản phẩm (để trống = ẩn)</label>
          <input type="number" className={inp} min={0} value={form.count} onChange={e => set('count', e.target.value)} />
        </div>

        <div className="sm:col-span-2">
          <label className={label}>Màu gradient (hiển thị trên website)</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {COLOR_PRESETS.map(p => (
              <button key={p.value} type="button" onClick={() => set('color', p.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all bg-gradient-to-r ${p.value} text-white ${form.color === p.value ? 'ring-2 ring-offset-1 ring-gray-600 scale-105' : 'opacity-75 hover:opacity-100'}`}>
                {p.label}
              </button>
            ))}
          </div>
          <input className={inp} placeholder="from-red-700 to-red-500"
            value={form.color} onChange={e => set('color', e.target.value)} />
        </div>

        <div className="sm:col-span-2">
          <label className={label}>Mô tả</label>
          <textarea rows={3} className={inp} value={form.description} onChange={e => set('description', e.target.value)} />
        </div>

        <div className="sm:col-span-2 flex items-center gap-2">
          <input type="checkbox" id="isService" checked={form.isService}
            onChange={e => set('isService', e.target.checked)} className="w-4 h-4 accent-primary" />
          <label htmlFor="isService" className="text-sm font-semibold text-gray-700 cursor-pointer">
            ✏️ Đây là danh mục dịch vụ (không có trang sản phẩm riêng)
          </label>
        </div>

        <div className="sm:col-span-2 flex gap-3 pt-2">
          <button type="submit" disabled={saving}
            className="bg-primary text-white font-bold px-8 py-2.5 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50">
            {saving ? 'Đang lưu...' : '💾 Lưu Danh Mục'}
          </button>
          <button type="button" onClick={onCancel}
            className="border border-gray-300 text-gray-600 font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
            Hủy
          </button>
        </div>
      </form>
    </div>
  )
}

/* ── Subcategory list ── */
function SubcategoryList({ subcategories, categories, loading, onAdd, onEdit, onDelete }) {
  const [sortKey, setSortKey] = useState('parentSlug')
  const [sortDir, setSortDir] = useState('asc')

  function handleSort(key) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const sorted = useMemo(() => {
    return [...subcategories].sort((a, b) => {
      let av, bv
      if (sortKey === 'parentLabel') {
        av = categories.find(c => c.slug === a.parentSlug)?.label ?? a.parentSlug ?? ''
        bv = categories.find(c => c.slug === b.parentSlug)?.label ?? b.parentSlug ?? ''
        av = av.toLowerCase(); bv = bv.toLowerCase()
      } else if (sortKey === 'order') {
        av = Number(a.order ?? 9999); bv = Number(b.order ?? 9999)
      } else {
        av = String(a[sortKey] ?? '').toLowerCase()
        bv = String(b[sortKey] ?? '').toLowerCase()
      }
      if (av < bv) return sortDir === 'asc' ? -1 : 1
      if (av > bv) return sortDir === 'asc' ? 1 : -1
      return 0
    })
  }, [subcategories, categories, sortKey, sortDir])

  return (
    <div className="max-w-6xl mx-auto p-6 mt-3">
      <div className="flex justify-between items-center mb-5 mt-3">
        <p className="text-sm text-gray-500">{subcategories.length} thương hiệu / danh mục con</p>
        <button onClick={onAdd}
          className="bg-amber-600 text-white font-bold px-5 py-2 rounded-lg hover:bg-amber-700 transition-colors text-sm">
          + Thêm Thương Hiệu
        </button>
      </div>
      {loading ? (
        <div className="text-center py-20 text-gray-400"><div className="text-3xl mb-3">⏳</div><p>Đang tải...</p></div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-auto">
          <table className="w-full text-sm min-w-[540px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 w-14">Icon</th>
                <SortTh sortKey="label"       current={sortKey} dir={sortDir} onSort={handleSort} className="text-left">Tên thương hiệu</SortTh>
                <SortTh sortKey="slug"        current={sortKey} dir={sortDir} onSort={handleSort} className="text-left">Slug</SortTh>
                <SortTh sortKey="parentLabel" current={sortKey} dir={sortDir} onSort={handleSort} className="text-left">Danh mục cha</SortTh>
                <SortTh sortKey="order"       current={sortKey} dir={sortDir} onSort={handleSort} className="text-center">Thứ tự</SortTh>
                <th className="w-28"></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((s, i) => {
                const parent = categories.find(c => c.slug === s.parentSlug)
                return (
                  <tr key={s.slug} className={`border-b last:border-0 ${i % 2 ? 'bg-gray-50/50' : ''}`}>
                    <td className="px-4 py-3 text-2xl">{s.icon || '🏷️'}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-800">{s.label}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs font-mono">{s.slug}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">
                      {parent ? `${parent.icon || ''} ${parent.label}` : <span className="text-red-400">{s.parentSlug}</span>}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-500">{s.order ?? '—'}</td>
                    <td className="px-4 py-3 text-right space-x-3">
                      <button onClick={() => onEdit(s)} className="text-blue-500 hover:underline font-medium">Sửa</button>
                      <button onClick={() => onDelete(s.slug)} className="text-red-400 hover:underline font-medium">Xóa</button>
                    </td>
                  </tr>
                )
              })}
              {subcategories.length === 0 && (
                <tr><td colSpan={6} className="text-center py-16 text-gray-400">
                  <div className="text-4xl mb-3">🏷️</div>
                  <p>Chưa có thương hiệu nào.</p>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

/* ── Subcategory form ── */
function SubcategoryForm({ subcategory, categories, onSave, onCancel }) {
  const isNew = !subcategory.slug
  const originalSlug = isNew ? null : subcategory.slug
  const [form, setForm] = useState({ ...EMPTY_SUB, ...subcategory, order: subcategory.order ?? '' })
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const inp   = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary'
  const label = 'block text-xs font-semibold text-gray-600 mb-1'
  const parentCats = categories.filter(c => !c.isService)

  function set(k, v) { setForm(f => ({ ...f, [k]: v })) }
  function showToast(msg) { setToast(msg); setTimeout(() => setToast(''), 2500) }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    await onSave(fromSubForm(form), originalSlug)
    setSaving(false)
    showToast(isNew ? '✅ Đã thêm thương hiệu!' : '✅ Đã lưu!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav title="🏷️ Thương Hiệu / Danh Mục Con" />
      {toast && (
        <div className="fixed top-5 right-5 bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg z-50">
          {toast}
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">

        <div className="sm:col-span-2">
          <label className={label}>Ảnh thương hiệu (logo / banner)</label>
          <ImageUploader value={form.image} onChange={v => set('image', v)} />
        </div>

        <div className="sm:col-span-2">
          <label className={label}>Tên thương hiệu *</label>
          <input required className={inp} placeholder="Ví dụ: Daikin, LG, Samsung..."
            value={form.label} onChange={e => set('label', e.target.value)} />
        </div>

        <div>
          <label className={label}>Slug URL (tự tạo nếu trống)</label>
          <input className={inp} placeholder="daikin" value={form.slug} onChange={e => set('slug', e.target.value)} />
        </div>

        <div>
          <label className={label}>Icon (emoji)</label>
          <input className={inp} placeholder="❄️" value={form.icon} onChange={e => set('icon', e.target.value)} />
        </div>

        <div>
          <label className={label}>Danh mục cha *</label>
          <select required className={inp} value={form.parentSlug} onChange={e => set('parentSlug', e.target.value)}>
            <option value="">-- Chọn danh mục cha --</option>
            {parentCats.map(c => (
              <option key={c.slug} value={c.slug}>{c.icon ? c.icon + ' ' : ''}{c.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={label}>Thứ tự hiển thị</label>
          <input type="number" className={inp} min={0} placeholder="0"
            value={form.order} onChange={e => set('order', e.target.value)} />
        </div>

        <div className="sm:col-span-2 flex gap-3 pt-2">
          <button type="submit" disabled={saving}
            className="bg-amber-600 text-white font-bold px-8 py-2.5 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50">
            {saving ? 'Đang lưu...' : '💾 Lưu Thương Hiệu'}
          </button>
          <button type="button" onClick={onCancel}
            className="border border-gray-300 text-gray-600 font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
            Hủy
          </button>
        </div>
      </form>
    </div>
  )
}

/* ── Main ── */
export default function AdminCategoriesPage() {
  const [authed,        setAuthed]        = useState(sessionStorage.getItem('qmg_admin') === '1')
  const [categories,    setCategories]    = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [tab,           setTab]           = useState('parent')   // 'parent' | 'sub'
  const [editing,       setEditing]       = useState(null)       // null=list | obj=form
  const [editingSub,    setEditingSub]    = useState(null)
  const [loading,       setLoading]       = useState(false)

  useEffect(() => { if (authed) load() }, [authed])

  async function load() {
    setLoading(true)
    try {
      await checkApiHealth()
      const [catRes, subRes] = await Promise.all([
        fetch(`${API}/api/categories`, { headers: adminHeaders() }),
        fetch(`${API}/api/subcategories`, { headers: adminHeaders() }),
      ])
      if (!catRes.ok) throw new Error(`HTTP ${catRes.status}`)
      setCategories(await catRes.json())
      if (subRes.ok) setSubcategories(await subRes.json())
    } catch {
      alert('❌ Không kết nối được API.\n\nKiểm tra VITE_API_URL và trạng thái backend.')
    }
    setLoading(false)
  }

  /* ─ Parent category CRUD ─ */
  async function persistCats(updated) {
    const res = await fetch(`${API}/api/categories`, {
      method: 'PUT',
      headers: adminHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(updated),
    })
    if (res.ok) { setCategories(updated); setEditing(null) }
    else alert('Lưu thất bại – kiểm tra server')
  }

  async function handleSaveCat(cat, originalSlug) {
    const key = originalSlug ?? cat.slug
    const updated = categories.some(c => c.slug === key)
      ? categories.map(c => c.slug === key ? cat : c)
      : [...categories, cat]
    await persistCats(updated)
  }

  async function handleDeleteCat(slug) {
    const c = categories.find(c => c.slug === slug)
    if (!confirm(`Xóa danh mục "${c?.label}"?\nCác sản phẩm trong danh mục này sẽ không bị xóa.`)) return
    await persistCats(categories.filter(c => c.slug !== slug))
  }

  /* ─ Subcategory CRUD ─ */
  async function handleSaveSub(sub, originalSlug) {
    const key = originalSlug ?? sub.slug
    const method = key && subcategories.some(s => s.slug === key) ? 'PUT' : 'POST'
    const url = method === 'PUT'
      ? `${API}/api/subcategories/${key}`
      : `${API}/api/subcategories`
    const res = await fetch(url, {
      method,
      headers: adminHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(sub),
    })
    if (res.ok) {
      const saved = await res.json()
      if (method === 'PUT') {
        setSubcategories(prev => prev.map(s => s.slug === key ? saved : s))
      } else {
        setSubcategories(prev => [...prev, saved])
      }
      setEditingSub(null)
    } else {
      alert('Lưu thất bại – kiểm tra server')
    }
  }

  async function handleDeleteSub(slug) {
    const s = subcategories.find(s => s.slug === slug)
    if (!confirm(`Xóa thương hiệu "${s?.label}"?`)) return
    const res = await fetch(`${API}/api/subcategories/${slug}`, {
      method: 'DELETE',
      headers: adminHeaders(),
    })
    if (res.ok) setSubcategories(prev => prev.filter(s => s.slug !== slug))
    else alert('Xóa thất bại – kiểm tra server')
  }

  function handleAuth() { sessionStorage.setItem('qmg_admin', '1'); setAuthed(true) }

  if (!authed) return <AdminLogin onAuth={handleAuth} />

  if (editing !== null) return (
    <CategoryForm category={editing} onSave={handleSaveCat} onCancel={() => setEditing(null)} />
  )

  if (editingSub !== null) return (
    <SubcategoryForm subcategory={editingSub} categories={categories} onSave={handleSaveSub} onCancel={() => setEditingSub(null)} />
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav title="📂 Danh Mục" />

      {/* Tab switcher */}
      <div className="max-w-6xl mx-auto px-6 pt-4 flex gap-2">
        <button
          onClick={() => setTab('parent')}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${tab === 'parent' ? 'bg-primary text-white' : 'border border-gray-300 text-gray-600 hover:border-primary hover:text-primary'}`}
        >
          📂 Danh Mục Cha ({categories.length})
        </button>
        <button
          onClick={() => setTab('sub')}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${tab === 'sub' ? 'bg-amber-600 text-white' : 'border border-gray-300 text-gray-600 hover:border-amber-500 hover:text-amber-600'}`}
        >
          🏷️ Thương Hiệu / Danh Mục Con ({subcategories.length})
        </button>
      </div>

      {tab === 'parent' ? (
        <CategoryList
          categories={categories} loading={loading}
          onAdd={() => setEditing({ ...EMPTY_CAT })}
          onEdit={c => setEditing({ ...c })}
          onDelete={handleDeleteCat}
        />
      ) : (
        <SubcategoryList
          subcategories={subcategories} categories={categories} loading={loading}
          onAdd={() => setEditingSub({ ...EMPTY_SUB })}
          onEdit={s => setEditingSub({ ...s })}
          onDelete={handleDeleteSub}
        />
      )}
    </div>
  )
}
