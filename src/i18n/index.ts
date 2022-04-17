import dayjs from 'dayjs'
import { createI18n } from 'vue-i18n'
import en from './locales/en/en'
import fr from './locales/fr/fr'

const i18n = createI18n({
  locale: 'fr',
  fallbackLocale: 'en',
  allowComposition: true,
  messages: {
    en: en,
    fr: fr
  }
})

export default i18n