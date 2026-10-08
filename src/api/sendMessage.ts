import { API_URL } from '../shared/constans'
import type { Instance } from '../shared/types'

export const sendMessage = (instance: Instance, chatId: string, message: string) => {
  const { idInstance, tokenInstance } = instance

  return fetch(`${API_URL}/waInstance${idInstance}/sendMessage/${tokenInstance}`, {
    method: 'POST',
    body: JSON.stringify({
      chatId,
      message,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}