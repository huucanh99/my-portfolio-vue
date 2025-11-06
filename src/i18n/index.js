import { createI18n } from 'vue-i18n'

const STORAGE_KEY = 'lang'
const supported = ['en', 'zh']

// Lấy locale mặc định (ưu tiên localStorage → browser lang → en)
function detectLocale () {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (supported.includes(saved)) return saved
  const browser = (navigator.language || 'en').slice(0, 2)
  return supported.includes(browser) ? browser : 'en'
}

// Lazy-load messages từ JSON (vite hỗ trợ import động)
async function loadMessages (locale) {
  switch (locale) {
    case 'zh':
      return (await import('@/locales/zh.json')).default
    case 'en':
    default:
      return (await import('@/locales/en.json')).default
  }
}

export async function createI18nInstance () {
  const locale = detectLocale()
  const messages = await loadMessages(locale)

  const i18n = createI18n({
    legacy: false,
    locale,
    fallbackLocale: 'en',
    messages: { [locale]: messages },
  })

  // API đổi ngôn ngữ (lazy-load + lưu localStorage)
  const setLocale = async (next) => {
    if (!supported.includes(next)) return
    if (!i18n.global.availableLocales.includes(next)) {
      const msg = await loadMessages(next)
      i18n.global.setLocaleMessage(next, msg)
    }
    i18n.global.locale.value = next
    localStorage.setItem(STORAGE_KEY, next)
  }

  // gắn cả vào instance và global để tiện gọi
  i18n.setLocale = setLocale
  i18n.global.setLocale = setLocale

  return i18n
}
