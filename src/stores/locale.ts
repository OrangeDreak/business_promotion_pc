import { defineStore } from 'pinia'
import { ref } from 'vue'
import en from '@/locales/en'
import zh from '@/locales/zh'

export const useLocaleStore = defineStore('locale', () => {
  const currentLocale = ref(localStorage.getItem('locale') || 'en')
  const messages = {
    en,
    zh
  }

  function setLocale(locale: 'en' | 'zh') {
    currentLocale.value = locale
    localStorage.setItem('locale', locale)
  }

  function t(key: string): string {
    const keys = key.split('.')
    let result: any = messages[currentLocale.value]
    
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k]
      } else {
        return key
      }
    }
    
    return result
  }

  return {
    currentLocale,
    setLocale,
    t
  }
})