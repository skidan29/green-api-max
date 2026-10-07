import { useEffect, useState } from 'react'
import { API_URL } from '../../shared/constans'
import { LocalStorage, useLocalStorage } from '../../shared/hooks'
import { StyledMain } from './ChatArea.styles'
import { useParams } from 'react-router-dom'
import type { Instance } from '../../shared/types'

export const ChatArea = () => {
  const [instance] = useLocalStorage<Instance>(LocalStorage.InstanceInfo)
  const { chatId } = useParams<{ chatId: string }>()
  const [messageText, setMessageText] = useState('')

  const sendMessage = () => {
    if (!(messageText && chatId)) return

    const { idInstance, tokenInstance } = instance as { idInstance: string; tokenInstance: string }
    console.log(idInstance, tokenInstance)
    fetch(`${API_URL}/waInstance${idInstance}/sendMessage/${tokenInstance}`, {
      method: 'POST',
      body: JSON.stringify({
        chatId,
        message: messageText,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => setMessageText(''))
  }

  const getMessage = () => {
    if (!instance) return
    const { idInstance, tokenInstance } = instance

    fetch(`${API_URL}/waInstance${idInstance}/receiveNotification/${tokenInstance}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((messge) => {
        console.log(messge, messge.receiptId)
        delNotify(messge.receiptId)
      })
  }

  const delNotify = (receiptId: string) => {
    if (!instance) return
    const { idInstance, tokenInstance } = instance as { idInstance: string; tokenInstance: string }
    console.log(idInstance, tokenInstance)
    fetch(`${API_URL}/waInstance${idInstance}/deleteNotification/${tokenInstance}/${receiptId}`, {
      method: 'DELETE',
    }).then((data) => console.log(data))
  }

  useEffect(() => {
    getMessage()
  }, [])

  return (
    <StyledMain>
      {chatId && (
        <div>
          <input
            value={messageText}
            onChange={(e) => {
              setMessageText(e.target.value)
            }}
          />
          <button type="button" onClick={sendMessage}>
            Send
          </button>
        </div>
      )}
    </StyledMain>
  )
}
