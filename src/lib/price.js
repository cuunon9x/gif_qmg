export function formatVND(value) {
  const amount = Number(value)
  if (!Number.isFinite(amount) || amount <= 0) return ''
  return `${new Intl.NumberFormat('vi-VN').format(Math.round(amount))} ₫`
}

export function parsePriceNumber(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0
  if (typeof value !== 'string') return 0
  const digits = value.replace(/[^\d]/g, '')
  if (!digits) return 0
  const n = Number(digits)
  return Number.isFinite(n) ? n : 0
}

export function displayPrice(productLike) {
  if (!productLike) return 'Liên hệ'
  const byNum = formatVND(productLike.priceNum)
  if (byNum) return byNum

  const parsed = parsePriceNumber(productLike.price)
  const byParsed = formatVND(parsed)
  if (byParsed) return byParsed

  const raw = typeof productLike.price === 'string' ? productLike.price.trim() : ''
  return raw || 'Liên hệ'
}

