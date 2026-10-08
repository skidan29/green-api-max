import { API_URL } from '../shared/constans'
import type { Instance } from '../shared/types'

export const deleteNotification = (instance: Instance, receiptId: number) => {
  const { idInstance, tokenInstance } = instance

  return fetch(
    `${API_URL}/waInstance${idInstance}/deleteNotification/${tokenInstance}/${receiptId}`,
    {
      method: 'DELETE',
    }
  )
}