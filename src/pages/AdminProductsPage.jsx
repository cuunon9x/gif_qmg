import { useState, useEffect } from "react";
import {
  API,
  AdminLogin,
  AdminNav,
  ImagesUploader,
  VideosUploader,
  slugify,
  adminHeaders,
  checkApiHealth,
} from "../components/AdminShared";
import { displayPrice, formatVND } from "../lib/price";

// Removed hardcoded PRODUCT_CATS — now uses dynamic subcategories from API

const EMPTY_PRODUCT = {
  id: null,
  slug: "",
  name: "",
  price: "",
  priceNum: 0,
  category: "",      // brand subcategory slug (e.g. "daikin")
  subcat: "",         // HP-size group slug (e.g. "9000-btu")
  subcatLabel: "",    // HP-size group label (auto-filled from brand selection)
  featured: false,
  image: "",
  images: [],
  videos: [],
  badge: "",
  description: "",
  variants: "",
  tags: "",
};

function toProductForm(p) {
  const imgs = Array.isArray(p.images) ? p.images.filter(Boolean) : []
  const merged = imgs.length ? imgs : (p.image ? [p.image] : [])
  const vids = Array.isArray(p.videos)
    ? p.videos.filter(Boolean)
    : (p.video ? [p.video].filter(Boolean) : [])
  return {
    ...p,
    variants: Array.isArray(p.variants)
      ? p.variants
          .map((v) => {
            const label = String(v?.label || "").trim();
            if (!label) return "";
            const priceNum = Number(v?.priceNum) || 0;
            const stock = Number.isFinite(Number(v?.stock)) ? Number(v.stock) : null;

            const parts = [label];
            if (priceNum > 0) parts.push(String(priceNum));
            if (stock !== null) {
              // keep slot for price if missing
              if (parts.length === 1) parts.push("");
              parts.push(String(stock));
            }
            return parts.join(" | ").trimEnd();
          })
          .filter(Boolean)
          .join("\n")
      : "",
    tags: Array.isArray(p.tags) ? p.tags.join(", ") : "",
    badge: p.badge ?? "",
    images: merged,
    image: merged[0] || "",
    videos: vids,
    subcat: p.subcat ?? "",
    subcatLabel: p.subcatLabel ?? "",
  };
}

function fromProductForm(f) {
  const id = f.id || null;
  const slug = f.slug.trim() || slugify(f.name);
  const images = Array.isArray(f.images) ? f.images.filter(Boolean) : (f.image ? [f.image] : []);
  const videos = Array.isArray(f.videos)
    ? f.videos.filter(Boolean)
    : (f.video ? [f.video].filter(Boolean) : []);
  const numericPrice = Number(f.priceNum) || 0;
  // strip internal helper fields
  const { _parentSlug: _p, contents: _c, minOrder: _m, lead: _l, ...rest } = f;
  const variantLines = String(f.variants || '')
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
  const variants = variantLines.map((line) => {
    const [rawLabel, rawPriceNum, rawStock] = line.split("|").map((s) => String(s || "").trim());
    const label = rawLabel;
    const priceNum = Number(rawPriceNum) || 0;
    const stock = rawStock === "" ? null : (Number.isFinite(Number(rawStock)) ? Number(rawStock) : null);
    return {
      id: slugify(label),
      label,
      priceNum,
      price: priceNum > 0 ? formatVND(priceNum) : null,
      stock,
    };
  })
  return {
    ...rest,
    id,
    slug,
    priceNum: numericPrice,
    price: f.price?.trim() ? f.price.trim() : (numericPrice > 0 ? formatVND(numericPrice) : "Liên hệ"),
    badge: f.badge.trim() || null,
    variants,
    tags: f.tags
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    images,
    image: images[0] || "",
    videos,
  };
}

/* ── Product list ── */
function ProductList({
  products,
  total,
  page,
  pageSize,
  search,
  filterCat,
  categories,
  subcategories,
  loading,
  onSearchChange,
  onFilterCatChange,
  onPageChange,
  onPageSizeChange,
  onAdd,
  onEdit,
  onDelete,
}) {
  // Filter tabs: parent categories only (6 tabs max)
  const parentCats = categories.filter((c) => !c.isService);
  const totalItems = total;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  // Resolve display label: brand subcategory name preferred
  function catLabel(p) {
    const sub = subcategories.find((s) => s.slug === p.category);
    if (sub) return sub.label;
    const parent = categories.find((c) => c.slug === p.category);
    return parent?.label ?? p.category ?? '—';
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-3">
      <div className="flex items-center justify-between mb-5 mt-3 flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          {[{ slug: "all", label: "Tất cả" }, ...parentCats].map((c) => (
            <button
              key={c.slug}
              onClick={() => onFilterCatChange(c.slug)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${filterCat === c.slug ? "bg-primary text-white border-primary" : "border-gray-300 text-gray-600 hover:border-primary hover:text-primary"}`}
            >
              {c.icon ? `${c.icon} ` : ""}
              {c.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm theo tên, slug, tag..."
            className="w-64 max-w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={onAdd}
            className="bg-primary text-white font-bold px-5 py-2 rounded-lg hover:bg-primary-dark transition-colors text-sm"
          >
            + Thêm Sản Phẩm
          </button>
        </div>
      </div>
      {loading ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-3xl mb-3">⏳</div>
          <p>
            Đang tải... (đảm bảo server đang chạy: <code>npm run server</code>)
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3 bg-gray-50/70">
            <p className="text-sm text-gray-500">
              {totalItems} sản phẩm • Trang {currentPage}/{totalPages}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Hiển thị</span>
              <select
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-primary"
              >
                {[10, 20, 50].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <span className="text-gray-500">/ trang</span>
            </div>
          </div>
          <div className="overflow-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 w-16">
                  Ảnh
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">
                  Tên sản phẩm
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">
                  Danh mục
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">
                  Giá
                </th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">
                  Nổi bật
                </th>
                <th className="w-28"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr
                  key={p.id}
                  className={`border-b last:border-0 ${i % 2 ? "bg-gray-50/50" : ""}`}
                >
                  <td className="px-4 py-3">
                    <img
                      src={p.images?.[0] || p.image}
                      alt=""
                      className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                      onError={(e) => {
                        e.target.src =
                          "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><rect fill='%23f3f4f6' width='48' height='48'/></svg>";
                      }}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-800">{p.name}</div>
                    {p.badge && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {p.badge}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {catLabel(p)}
                  </td>
                  <td className="px-4 py-3 font-semibold text-primary text-xs">
                    {displayPrice(p)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {p.featured ? "⭐" : "—"}
                  </td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <button
                      onClick={() => onEdit(p)}
                      className="text-blue-500 hover:underline font-medium"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => onDelete(p.id)}
                      className="text-red-400 hover:underline font-medium"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    Không có sản phẩm
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
          {totalPages > 1 && (
            <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-end gap-2 bg-white">
              <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-md disabled:opacity-50 hover:border-primary hover:text-primary transition-colors"
              >
                Trước
              </button>
              <span className="text-sm text-gray-600 px-2">
                {currentPage}/{totalPages}
              </span>
              <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-md disabled:opacity-50 hover:border-primary hover:text-primary transition-colors"
              >
                Sau
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Product form ── */
function ProductForm({ product, categories, subcategories, onSave, onCancel }) {
  const isNew = !product.id;
  // derive _parentSlug from existing brand when editing
  const initParent = () => {
    if (!product.category) return '';
    const sub = subcategories.find(s => s.slug === product.category);
    return sub?.parentSlug ?? '';
  };
  const [form, setForm] = useState(
    isNew ? { ...EMPTY_PRODUCT, _parentSlug: '' } : { ...toProductForm(product), _parentSlug: initParent() },
  );
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const inp =
    "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary";
  const label = "block text-xs font-semibold text-gray-600 mb-1";

  // parent cats for first-level picker
  const parentCats = categories.filter((c) => !c.isService);
  // brands filtered by selected parent
  const brandOpts = form._parentSlug
    ? subcategories.filter(s => s.parentSlug === form._parentSlug)
    : subcategories;
  // service cat option
  const serviceCat = categories.find(c => c.isService);

  function set(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }
  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    await onSave(fromProductForm(form));
    setSaving(false);
    showToast("✅ Đã lưu!");
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav title="📦 Sản Phẩm" />
      {toast && (
        <div className="fixed top-5 right-5 bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg z-50">
          {toast}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-1 space-y-3">
          <label className={label}>Ảnh sản phẩm (nhiều ảnh)</label>
          <ImagesUploader
            value={form.images || []}
            onChange={(arr) => {
              set("images", arr);
              set("image", arr?.[0] || "");
            }}
          />

          <div className="pt-2" />
          <label className={label}>Video sản phẩm (nhiều video)</label>
          <VideosUploader
            value={form.videos || []}
            onChange={(arr) => {
              set("videos", arr);
            }}
          />
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={label}>Tên sản phẩm *</label>
            <input
              required
              className={inp}
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </div>
          <div>
            <label className={label}>Giá hiển thị</label>
            <input
              className={inp}
              placeholder="690.000 ₫ hoặc Liên hệ"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
            />
          </div>
          <div>
            <label className={label}>Giá số (để sắp xếp)</label>
            <input
              type="number"
              className={inp}
              min={0}
              value={form.priceNum}
              onChange={(e) => set("priceNum", e.target.value)}
            />
          </div>
          <div>
            <label className={label}>Danh mục cha *</label>
            <select
              className={inp}
              value={form._parentSlug}
              onChange={(e) => {
                set('_parentSlug', e.target.value);
                set('category', '');
                set('subcatLabel', '');
              }}
            >
              <option value="">-- Chọn danh mục --</option>
              {parentCats.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.icon ? c.icon + ' ' : ''}{c.label}
                </option>
              ))}
              {serviceCat && (
                <option value={serviceCat.slug}>
                  {serviceCat.icon ? serviceCat.icon + ' ' : ''}{serviceCat.label}
                </option>
              )}
            </select>
          </div>
          <div>
            <label className={label}>Thương hiệu *</label>
            <select
              required
              className={inp}
              value={form.category}
              onChange={(e) => {
                const slug = e.target.value;
                set('category', slug);
                const sub = subcategories.find(s => s.slug === slug);
                if (sub) set('subcatLabel', sub.label);
                // if parent not set yet, infer it
                if (!form._parentSlug && sub?.parentSlug) set('_parentSlug', sub.parentSlug);
              }}
            >
              <option value="">-- Chọn thương hiệu --</option>
              {brandOpts.map((s) => (
                <option key={s.slug} value={s.slug}>{s.label}</option>
              ))}
              {/* allow dich-vu products too */}
              {serviceCat && form._parentSlug === serviceCat.slug && (
                <option value={serviceCat.slug}>{serviceCat.label}</option>
              )}
            </select>
          </div>
          <div>
            <label className={label}>Badge nhãn</label>
            <input
              className={inp}
              placeholder="Bán chạy / Mới / Inverter..."
              value={form.badge}
              onChange={(e) => set("badge", e.target.value)}
            />
          </div>
          <div>
            <label className={label}>Nhóm HP / loại (slug)</label>
            <input
              className={inp}
              placeholder="9000-btu / 12000-btu..."
              value={form.subcat}
              onChange={(e) => set("subcat", e.target.value)}
            />
          </div>
          <div>
            <label className={label}>Nhãn nhóm HP</label>
            <input
              className={inp}
              placeholder="9.000 BTU / 12.000 BTU..."
              value={form.subcatLabel}
              onChange={(e) => set("subcatLabel", e.target.value)}
            />
          </div>
          <div>
            <label className={label}>Slug URL (tự tạo nếu trống)</label>
            <input
              className={inp}
              placeholder="hop-qua-tet-phu-quy"
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 pt-5">
            <input
              type="checkbox"
              id="featured"
              checked={form.featured}
              onChange={(e) => set("featured", e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            <label
              htmlFor="featured"
              className="text-sm font-semibold text-gray-700 cursor-pointer"
            >
              ⭐ Sản phẩm nổi bật
            </label>
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Mô tả ngắn</label>
            <textarea
              rows={3}
              className={inp}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Biến thể / Giá / Tồn kho. Mỗi dòng một loại.</label>
            <textarea
              rows={4}
              className={inp}
              placeholder={"1 HP | 7900000 | 20\n1.5 HP | 9500000 | 15\n2 HP | 12500000 | 10\n..."}
              value={form.variants}
              onChange={(e) => set("variants", e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Tags (phân cách bằng dấu phẩy)</label>
            <input
              className={inp}
              placeholder="sang trọng, VIP..."
              value={form.tags}
              onChange={(e) => set("tags", e.target.value)}
            />
          </div>
          <div className="sm:col-span-2 flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-primary text-white font-bold px-8 py-2.5 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {saving ? "Đang lưu..." : "💾 Lưu Sản Phẩm"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="border border-gray-300 text-gray-600 font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

/* ── Main ── */
export default function AdminProductsPage() {
  const [authed, setAuthed] = useState(
    sessionStorage.getItem("qmg_admin") === "1",
  );
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  useEffect(() => {
    if (authed) {
      loadCategories();
    }
  }, [authed]);

  useEffect(() => {
    if (authed) loadProducts();
  }, [authed, search, filterCat, page, pageSize]);

  async function loadProducts() {
    setLoading(true);
    try {
      await checkApiHealth();
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
      });
      if (search) params.set("search", search);
      if (filterCat !== "all") params.set("category", filterCat);

      const res = await fetch(`${API}/api/products?${params.toString()}`, {
        headers: adminHeaders(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
        setTotal(data.length);
      } else {
        setProducts(Array.isArray(data.items) ? data.items : []);
        setTotal(Number(data.total) || 0);
        if (Number.isFinite(Number(data.page))) setPage(Number(data.page));
      }
    } catch {
      alert(
        "❌ Không kết nối được API production.\n\nKiểm tra VITE_API_URL và trạng thái backend.",
      );
    }
    setLoading(false);
  }

  async function fetchAllProductsRaw() {
    const res = await fetch(`${API}/api/products`, {
      headers: adminHeaders(),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : (Array.isArray(data.items) ? data.items : []);
  }

  async function loadCategories() {
    try {
      const [catRes, subRes] = await Promise.all([
        fetch(`${API}/api/categories`, { headers: adminHeaders() }),
        fetch(`${API}/api/subcategories`, { headers: adminHeaders() }),
      ]);
      if (catRes.ok) setCategories(await catRes.json());
      if (subRes.ok) setSubcategories(await subRes.json());
    } catch {
      /* silent */
    }
  }

  async function handleSave(product) {
    let fullList = [];
    try {
      fullList = await fetchAllProductsRaw();
    } catch {
      alert("Không tải được danh sách sản phẩm hiện tại để lưu.");
      return;
    }
    const normalized = product.id
      ? product
      : {
          ...product,
          id: Math.max(0, ...fullList.map((p) => Number(p.id) || 0)) + 1,
        };
    const updated =
      normalized.id && fullList.some((p) => p.id === normalized.id)
        ? fullList.map((p) => (p.id === normalized.id ? normalized : p))
        : [...fullList, normalized];
    const res = await fetch(`${API}/api/products`, {
      method: "PUT",
      headers: adminHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(updated),
    });
    if (res.ok) {
      await loadProducts();
      setEditing(null);
    } else alert("Lưu thất bại – kiểm tra server");
  }

  async function handleDelete(id) {
    let fullList = [];
    try {
      fullList = await fetchAllProductsRaw();
    } catch {
      alert("Không tải được danh sách sản phẩm hiện tại để xóa.");
      return;
    }
    const p = fullList.find((pr) => pr.id === id);
    if (!confirm(`Xóa sản phẩm "${p?.name}"?`)) return;
    const updated = fullList.filter((pr) => pr.id !== id);
    const res = await fetch(`${API}/api/products`, {
      method: "PUT",
      headers: adminHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(updated),
    });
    if (res.ok) await loadProducts();
    else alert("Xóa thất bại – kiểm tra server");
  }

  function handleAuth() {
    sessionStorage.setItem("qmg_admin", "1");
    setAuthed(true);
  }

  if (!authed) return <AdminLogin onAuth={handleAuth} />;

  if (editing !== null)
    return (
      <ProductForm
        product={editing}
        categories={categories}
        subcategories={subcategories}
        onSave={handleSave}
        onCancel={() => setEditing(null)}
      />
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav title="📦 Sản Phẩm" />
      <ProductList
        products={products}
        total={total}
        page={page}
        pageSize={pageSize}
        search={searchInput}
        filterCat={filterCat}
        categories={categories}
        subcategories={subcategories}
        loading={loading}
        onSearchChange={setSearchInput}
        onFilterCatChange={(v) => {
          setFilterCat(v);
          setPage(1);
        }}
        onPageChange={setPage}
        onPageSizeChange={(v) => {
          setPageSize(v);
          setPage(1);
        }}
        onAdd={() => setEditing({ ...EMPTY_PRODUCT })}
        onEdit={(p) => setEditing({ ...p })}
        onDelete={handleDelete}
      />
    </div>
  );
}
