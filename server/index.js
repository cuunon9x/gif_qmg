import express from 'express'
import cors from 'cors'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PRODUCTS_FILE    = path.join(__dirname, '../src/data/products.json')
const CATEGORIES_FILE  = path.join(__dirname, '../src/data/categories.json')
const UPLOAD_DIR       = path.join(__dirname, '../public/images/products')

// Ensure upload directory exists
fs.mkdirSync(UPLOAD_DIR, { recursive: true })

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json({ limit: '2mb' }))

// ── Image upload ──────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (_, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Chỉ chấp nhận file ảnh'))
  },
})

// ── Routes ────────────────────────────────────────────────────

// GET all products
app.get('/api/products', (_, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'))
    res.json(data)
  } catch {
    res.json([])
  }
})

// PUT overwrite all products (admin saves)
app.put('/api/products', (req, res) => {
  if (!Array.isArray(req.body)) return res.status(400).json({ error: 'Expected array' })
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(req.body, null, 2), 'utf8')
  res.json({ ok: true, count: req.body.length })
})

// POST upload image → saved to public/images/products/
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Không có file' })
  res.json({ url: `/images/products/${req.file.filename}` })
})

// GET all categories
app.get('/api/categories', (_, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(CATEGORIES_FILE, 'utf8'))
    res.json(data)
  } catch {
    res.json([])
  }
})

// PUT overwrite all categories
app.put('/api/categories', (req, res) => {
  if (!Array.isArray(req.body)) return res.status(400).json({ error: 'Expected array' })
  fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(req.body, null, 2), 'utf8')
  res.json({ ok: true, count: req.body.length })
})

// Error handler
app.use((err, _req, res, _next) => {
  res.status(500).json({ error: err.message })
})

app.listen(PORT, () => {
  console.log(`\n✅  QMG Admin API  →  http://localhost:${PORT}`)
  console.log(`   Admin UI        →  http://localhost:5175/#/admin`)
  console.log(`\n   Sau khi sửa sản phẩm, chạy: npm run build\n`)
})
