const WEB3FORMS_URL = 'https://api.web3forms.com/submit'

export function getWeb3FormsAccessKey() {
  return import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || ''
}

/**
 * @param {Record<string, unknown>} payload - fields sent to Web3Forms (must include access_key or caller adds it)
 * @returns {Promise<{ ok: boolean, message: string }>}
 */
export async function submitWeb3Forms(payload) {
  const access_key = getWeb3FormsAccessKey()
  if (!access_key) {
    return { ok: false, message: 'Thiếu VITE_WEB3FORMS_ACCESS_KEY trong .env' }
  }

  const res = await fetch(WEB3FORMS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...payload, access_key }),
  })

  let data = {}
  try {
    data = await res.json()
  } catch {
    return { ok: false, message: 'Phản hồi không hợp lệ từ Web3Forms' }
  }

  if (data.success) return { ok: true, message: data.message || 'Đã gửi thành công.' }
  return { ok: false, message: data.message || 'Gửi thất bại' }
}
