import { API_URL } from '../shared/constans'
import type { ChatInfo, Instance } from '../shared/types'

export const checkAccount = async (instance: Instance, phoneNumber: string): Promise<ChatInfo> => {
  const { idInstance, tokenInstance } = instance

  const res = await fetch(`${API_URL}/waInstance${idInstance}/checkAccount/${tokenInstance}`, {
    method: 'POST',
    body: JSON.stringify({
      phoneNumber: Number(phoneNumber),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return res.json()
}