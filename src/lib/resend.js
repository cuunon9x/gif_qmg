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

export function submitCheckout({ form, items }) {
  return fetch(`${API_BASE}/api/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ form, items }),
  }).then(async (res) => {
    let data = {}
    try {
      data = await res.json()
    } catch {
      // ignore
    }
    if (!res.ok) {
      const msg = data?.message || data?.error || `HTTP ${res.status}`
      const err = new Error(msg)
      err.data = data
      throw err
    }
    return data
  })
}

