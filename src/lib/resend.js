const API_BASE = import.meta.env.VITE_API_URL

export function submitResendEmail({ subject, fields }) {
  return fetch(`${API_BASE}/api/send-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ subject, fields }),
  }).then(async (res) => {
    let data = {}
    try {
      data = await res.json()
    } catch {
      // ignore
    }
    if (!res.ok) {
      const msg = data?.error || data?.message || `HTTP ${res.status}`
      throw new Error(msg)
    }
    return data
  })
}

