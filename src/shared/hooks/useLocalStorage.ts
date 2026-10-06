import { useCallback, useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import { LocalStorage } from './localStorage'

type LocalStorageKey = (typeof LocalStorage)[keyof typeof LocalStorage]

function readValue<T>(key: string): T | null {
  try {
    const item = window.localStorage.getItem(key)

    return item !== null ? (JSON.parse(item) as T) : null
  } catch (error) {
    console.warn(`[useLocalStorage] Не удалось прочитать ключ "${key}"`, error)

    return null
  }
}

export function useLocalStorage<T>(
  key: LocalStorageKey
): [T | null, Dispatch<SetStateAction<T | null>>, () => void] {
  const [value, setValue] = useState<T | null>(() => readValue<T>(key))

  // Синхронизация значения между вкладками браузера
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== key) {
        return
      }

      if (event.newValue === null) {
        setValue(null)
        return
      }

      try {
        setValue(JSON.parse(event.newValue) as T)
      } catch (error) {
        console.warn(`[useLocalStorage] Ошибка парсинга ключа "${key}"`, error)
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [key])

  const setStoredValue: Dispatch<SetStateAction<T | null>> = useCallback(
    (nextValue) => {
      setValue((prevValue) => {
        const resolved =
          typeof nextValue === 'function'
            ? (nextValue as (prev: T | null) => T | null)(prevValue)
            : nextValue

        try {
          if (resolved === null) {
            window.localStorage.removeItem(key)
          } else {
            window.localStorage.setItem(key, JSON.stringify(resolved))
          }
        } catch (error) {
          console.warn(`[useLocalStorage] Не удалось сохранить ключ "${key}"`, error)
        }

        return resolved
      })
    },
    [key]
  )

  const removeValue = useCallback(() => {
    window.localStorage.removeItem(key)
    setValue(null)
  }, [key])

  return [value, setStoredValue, removeValue]
}
