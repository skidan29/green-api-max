import { useCallback, useEffect, useState } from 'react'
import { API_URL } from '../../shared/constans'
import { LocalStorage, useLocalStorage } from '../../shared/hooks'
import { StyledMain } from './ChatArea.styles'
import { useParams } from 'react-router-dom'
import type {
  ExtendedTextMessageData,
  Instance,
  ReceiveNotification,
  SimplifiedMessage,
  TextMessageData,
} from '../../shared/types'

export const ChatArea = () => {
  const [instance] = useLocalStorage<Instance>(LocalStorage.InstanceInfo)
  const { chatId } = useParams<{ chatId: string }>()
  const [messageText, setMessageText] = useState('')
  const [messages, setMessages] = useState<SimplifiedMessage[]>([])

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

  const removeNotification = useCallback(
    (receiptId: number) => {
      if (!instance) return
      const { idInstance, tokenInstance } = instance as {
        idInstance: string
        tokenInstance: string
      }
      console.log(idInstance, tokenInstance)
      fetch(`${API_URL}/waInstance${idInstance}/deleteNotification/${tokenInstance}/${receiptId}`, {
        method: 'DELETE',
      }).then((data) => console.log(data))
    },
    [instance]
  )

  const extractTextFromMessageData = useCallback(
    (messageData: TextMessageData | ExtendedTextMessageData): string => {
      if (messageData.typeMessage === 'extendedTextMessage') {
        return messageData.extendedTextMessageData.text
      }
      return messageData.textMessageData.textMessage
    },
    []
  )

  const getNotification = useCallback(() => {
    if (!instance) return
    const { idInstance, tokenInstance } = instance

    fetch(`${API_URL}/waInstance${idInstance}/receiveNotification/${tokenInstance}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((message: ReceiveNotification) => {
        const messageBody = message?.body
        const receiptId = message?.receiptId
        if (receiptId) {
          removeNotification(receiptId)
        }

        if (
          !(
            messageBody &&
            (messageBody.typeWebhook === 'incomingMessageReceived' ||
              messageBody.typeWebhook === 'outgoingAPIMessageReceived')
          )
        ) {
          return
        }

        const simplifiedMessage: SimplifiedMessage = {
          type: messageBody.typeWebhook,
          text: extractTextFromMessageData(messageBody.messageData),
        }

        setMessages((prev) => [...prev, simplifiedMessage])
      })
  }, [extractTextFromMessageData, instance, removeNotification])

  useEffect(() => {
    let interval = null

    if (chatId) {
      interval = setInterval(getNotification, 5000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [chatId, getNotification])

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
          {messages && messages.map((message) => <div>{message.text}</div>)}
        </div>
      )}
    </StyledMain>
  )
}
