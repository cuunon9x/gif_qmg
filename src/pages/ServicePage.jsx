import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useInView from '../hooks/useInView'

const STEPS = [
  { step: '01', icon: 'ðŸ“ž', title: 'Tiáº¿p Nháº­n YÃªu Cáº§u', desc: 'Gá»i Ä‘iá»‡n hoáº·c nháº¯n Zalo â€“ Ä‘á»™i ká»¹ thuáº­t QMG HVAC tÆ° váº¥n miá»…n phÃ­ vá» loáº¡i thiáº¿t bá»‹, cÃ´ng suáº¥t vÃ  giáº£i phÃ¡p phÃ¹ há»£p.' },
  { step: '02', icon: 'ðŸ”', title: 'Kháº£o SÃ¡t & BÃ¡o GiÃ¡', desc: 'Ká»¹ thuáº­t viÃªn kháº£o sÃ¡t thá»±c táº¿ (miá»…n phÃ­), lÃªn báº£n váº½ máº·t báº±ng vÃ  gá»­i bÃ¡o giÃ¡ chi tiáº¿t, minh báº¡ch trong 24h.' },
  { step: '03', icon: 'ðŸ”§', title: 'Thi CÃ´ng & Láº¯p Äáº·t', desc: 'Äá»™i thi cÃ´ng giÃ u kinh nghiá»‡m, thiáº¿t bá»‹ chÃ­nh hÃ£ng, tuÃ¢n thá»§ Ä‘Ãºng quy trÃ¬nh ká»¹ thuáº­t HVAC Ä‘áº£m báº£o an toÃ n.' },
  { step: '04', icon: 'âœ…', title: 'Nghiá»‡m Thu & Báº£o HÃ nh', desc: 'Cháº¡y thá»­, kiá»ƒm tra toÃ n bá»™ há»‡ thá»‘ng trÆ°á»›c bÃ n giao. Báº£o hÃ nh theo nhÃ  sáº£n xuáº¥t, há»— trá»£ báº£o trÃ¬ Ä‘á»‹nh ká»³.' },
]

const SERVICES = [
  { icon: 'â„ï¸', title: 'Cung Cáº¥p MÃ¡y Láº¡nh ChÃ­nh HÃ£ng', desc: 'Äáº¡i lÃ½ chÃ­nh hÃ£ng Daikin, Mitsubishi, Panasonic, Toshiba, Midea. GiÃ¡ cáº¡nh tranh, báº£o hÃ nh Ä‘áº§y Ä‘á»§ theo hÃ£ng.' },
  { icon: 'ðŸ”©', title: 'Thi CÃ´ng Láº¯p Äáº·t Äiá»u HÃ²a', desc: 'Láº¯p Ä‘áº·t Ä‘iá»u hÃ²a dÃ¢n dá»¥ng, vÄƒn phÃ²ng, nhÃ  xÆ°á»Ÿng. Äi dÃ¢y, láº¯p Ä‘áº·t Ä‘Ãºng ká»¹ thuáº­t â€“ thi cÃ´ng gá»n gÃ ng, sáº¡ch sáº½.' },
  { icon: 'ðŸ› ï¸', title: 'Báº£o TrÃ¬ â€“ Vá»‡ Sinh Äá»‹nh Ká»³', desc: 'Vá»‡ sinh dÃ n láº¡nh, dÃ n nÃ³ng, kiá»ƒm tra gas, báº£o dÆ°á»¡ng tá»•ng thá»ƒ giÃºp mÃ¡y váº­n hÃ nh hiá»‡u quáº£ vÃ  tiáº¿t kiá»‡m Ä‘iá»‡n.' },
  { icon: 'âš¡', title: 'Sá»­a Chá»¯a & Náº¡p Gas', desc: 'Xá»­ lÃ½ sá»± cá»‘, náº¡p gas, thay linh kiá»‡n chÃ­nh hÃ£ng. Pháº£n há»“i trong 5â€“15 phÃºt, kháº¯c phá»¥c nhanh chÃ³ng táº­n nÆ¡i.' },
]

export default function ServicePage() {
  const [form, setForm] = useState({ name: '', phone: '', service: '', address: '', note: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [headRef, headIn] = useInView()
  const [stepsRef, stepsIn] = useInView()
  const [formRef, formIn] = useInView()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY',
          subject: `QMG HVAC â€“ YÃªu cáº§u dá»‹ch vá»¥ â€“ ${form.name}`,
          ...form,
        }),
      })
      if (res.ok) setSent(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="pt-20 min-h-screen">
      {/* Hero banner */}
      <div className="relative h-60 md:h-80 overflow-hidden">
        <img src="https://res.cloudinary.com/dflar7nvn/image/upload/v1778763998/qmg/products/t8oc7foaybjgonoix5ue.png?w=1600&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Dá»‹ch Vá»¥ HVAC</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3">Giáº£i PhÃ¡p Äiá»‡n Láº¡nh ToÃ n Diá»‡n</h1>
          <p className="text-white/80 text-sm max-w-lg">Cung cáº¥p â€“ Láº¯p Ä‘áº·t â€“ Báº£o trÃ¬ â€“ Sá»­a chá»¯a há»‡ thá»‘ng Ä‘iá»u hÃ²a & HVAC toÃ n khu vá»±c BÃ¬nh DÆ°Æ¡ng vÃ  lÃ¢n cáº­n.</p>
        </div>
      </div>

      {/* Services grid */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div ref={headRef} className={`text-center mb-12 fade-up ${headIn ? 'in-view' : ''}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Dá»‹ch Vá»¥ Cá»§a QMG HVAC</h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
              Tá»« tÆ° váº¥n, cung cáº¥p thiáº¿t bá»‹ chÃ­nh hÃ£ng Ä‘áº¿n thi cÃ´ng, báº£o trÃ¬ â€“ QMG HVAC Ä‘á»“ng hÃ nh cÃ¹ng khÃ¡ch hÃ ng trong toÃ n bá»™ vÃ²ng Ä‘á»i há»‡ thá»‘ng Ä‘iá»‡n láº¡nh.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map((s, i) => (
              <div key={i} className="bg-primary-light rounded-2xl p-6 flex gap-4">
                <div className="text-4xl shrink-0">{s.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">{s.title}</h3>
                  <p className="text-gray-500 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">Quy TrÃ¬nh LÃ m Viá»‡c Chuáº©n HVAC</h2>
          <div ref={stepsRef} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 fade-up ${stepsIn ? 'in-view' : ''}`}>
            {STEPS.map((s, i) => (
              <div key={i} className="relative text-center" style={{ transitionDelay: `${i * 80}ms` }}>
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-3/4 w-1/2 h-0.5 bg-primary/30" />
                )}
                <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-2xl mx-auto mb-3">
                  {s.icon}
                </div>
                <div className="text-xs text-primary font-bold mb-1">BÆ°á»›c {s.step}</div>
                <h3 className="font-bold text-gray-800 text-sm mb-2">{s.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-14 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Äáº·t Lá»‹ch Dá»‹ch Vá»¥</h2>
          <p className="text-gray-500 text-sm text-center mb-8">Äiá»n thÃ´ng tin â€“ QMG HVAC sáº½ liÃªn há»‡ trong 5â€“15 phÃºt.</p>

          <div ref={formRef} className={`bg-primary-light rounded-3xl p-8 fade-up ${formIn ? 'in-view' : ''}`}>
            {sent ? (
              <div className="text-center py-6">
                <div className="text-5xl mb-3">âœ…</div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">YÃªu cáº§u Ä‘Ã£ gá»­i!</h3>
                <p className="text-gray-500 text-sm">QMG HVAC sáº½ liÃªn há»‡ vá»›i báº¡n trong 5â€“15 phÃºt.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Há» vÃ  tÃªn *</label>
                    <input name="name" required value={form.name} onChange={handleChange}
                      placeholder="Nguyá»…n VÄƒn A"
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Sá»‘ Ä‘iá»‡n thoáº¡i *</label>
                    <input name="phone" required value={form.phone} onChange={handleChange}
                      placeholder="0938 777 888"
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Dá»‹ch vá»¥ cáº§n</label>
                  <select name="service" value={form.service} onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white">
                    <option value="">-- Chá»n dá»‹ch vá»¥ --</option>
                    <option>Cung cáº¥p mÃ¡y láº¡nh chÃ­nh hÃ£ng</option>
                    <option>Thi cÃ´ng láº¯p Ä‘áº·t Ä‘iá»u hÃ²a</option>
                    <option>Báº£o trÃ¬ â€“ Vá»‡ sinh Ä‘á»‹nh ká»³</option>
                    <option>Sá»­a chá»¯a & Náº¡p gas</option>
                    <option>TÆ° váº¥n há»‡ thá»‘ng lá»›n (HVAC trung tÃ¢m)</option>
                    <option>KhÃ¡c</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Äá»‹a chá»‰ / Khu vá»±c</label>
                  <input name="address" value={form.address} onChange={handleChange}
                    placeholder="Thuáº­n An, BÃ¬nh DÆ°Æ¡ng..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Ghi chÃº thÃªm</label>
                  <textarea name="note" rows={3} value={form.note} onChange={handleChange}
                    placeholder="MÃ´ táº£ thÃªm yÃªu cáº§u, diá»‡n tÃ­ch phÃ²ng, sá»‘ lÆ°á»£ng thiáº¿t bá»‹..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white resize-none" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full rounded-xl bg-primary text-white font-bold py-3 text-sm hover:bg-primary-dark transition-colors disabled:opacity-60">
                  {loading ? 'Äang gá»­i...' : 'ðŸ“… Gá»­i YÃªu Cáº§u Dá»‹ch Vá»¥'}
                </button>
                <p className="text-xs text-gray-400 text-center">Hoáº·c gá»i trá»±c tiáº¿p <a href="tel:0938777888" className="text-primary font-semibold">0938 777 888</a> Ä‘á»ƒ Ä‘Æ°á»£c há»— trá»£ ngay.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

