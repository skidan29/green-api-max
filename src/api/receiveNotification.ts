import { API_URL } from '../shared/constans'
import type { Instance, ReceiveNotification } from '../shared/types'

export const receiveNotification = async (
  instance: Instance
): Promise<ReceiveNotification | null> => {
  const { idInstance, tokenInstance } = instance

  const res = await fetch(
    `${API_URL}/waInstance${idInstance}/receiveNotification/${tokenInstance}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  return res.json()
}