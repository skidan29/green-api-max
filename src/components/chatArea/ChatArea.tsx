import { useEffect } from 'react'
import { API_URL } from '../../shared/constans'
import { LocalStorage, useLocalStorage } from '../../shared/hooks'
import { StyledMain } from './ChatArea.styles'

export const ChatArea = () => {
  const [value] = useLocalStorage(LocalStorage.InstanceInfo)

  const getMessage = () => {
    if (!value) return
    const { idInstance, tokenInstance } = value as { idInstance: string; tokenInstance: string }
    console.log(idInstance, tokenInstance)
    fetch(
      `${API_URL}/waInstance${idInstance}/receiveNotification/${tokenInstance}`,
      {
        method: 'GET',
      }
    )
      .then((data) => data.json())
      .then((messge) => {
        console.log(messge)
        // delNotify(messge.receiptId)
      })
  }

  const delNotify = (receiptId: string) => {
    if (!value) return
    const { idInstance, tokenInstance } = value as { idInstance: string; tokenInstance: string }
    console.log(idInstance, tokenInstance)
    fetch(`${API_URL}/waInstance${idInstance}/deleteNotification/${tokenInstance}/${receiptId}`, {
      method: 'DELETE',
    }).then((data) => console.log(data))
  }

  useEffect(() => {
    getMessage()
  }, [])

  return <StyledMain>Chat</StyledMain>
}
