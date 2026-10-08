import { useCallback, useEffect, useState } from 'react'
import { deleteNotification, receiveNotification, sendMessage as sendMessageAPI } from '../../api'
import { LocalStorage, useLocalStorage } from '../../shared/hooks'
import {
  MessageContainer,
  NoContentText,
  ScrollContainer,
  SendButton,
  StyledContainer,
  StyledHeader,
  StyledInputMessage,
  StyledMain,
  StyledMessage,
  StyledTextarea,
} from './ChatArea.styles'
import { useNavigate, useParams } from 'react-router-dom'
import type {
  ExtendedTextMessageData,
  Instance,
  ReceiveNotification,
  SimplifiedMessage,
  TextMessageData,
} from '../../shared/types'
import { ArrowBack, ArrowUpward } from '@shared/components/icons'

export const ChatArea = () => {
  const [instance] = useLocalStorage<Instance>(LocalStorage.InstanceInfo)
  const { chatId } = useParams<{ chatId: string }>()
  const [messageText, setMessageText] = useState('')
  const [messages, setMessages] = useState<SimplifiedMessage[]>([])
  const navigate = useNavigate()

  const sendMessage = () => {
    if (!(messageText && chatId && instance)) return

    const { idInstance, tokenInstance } = instance
    console.log(idInstance, tokenInstance)
    sendMessageAPI(instance, chatId, messageText).then(() => setMessageText(''))
  }

  const removeNotification = useCallback(
    (receiptId: number) => {
      if (!instance) return
      const { idInstance, tokenInstance } = instance as {
        idInstance: string
        tokenInstance: string
      }
      console.log(idInstance, tokenInstance)
      deleteNotification(instance, receiptId).then((data) => console.log(data))
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

    receiveNotification(instance).then((message: ReceiveNotification | null) => {
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
        timestamp: messageBody.timestamp,
        type: messageBody.typeWebhook,
        text: extractTextFromMessageData(messageBody.messageData),
      }

      setMessages((prev) => [...prev, simplifiedMessage])
    })
  }, [extractTextFromMessageData, instance, removeNotification])

  useEffect(() => {
    let interval = null
    if (interval) {
      clearInterval(interval)
    }

    if (!chatId) return

    interval = setInterval(getNotification, 5000)

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [chatId, getNotification])

  const closeСhat = useCallback(() => {
    navigate('/')
  }, [navigate])

  const getDate = useCallback((ms: number): string => {
    const date = new Date(ms)
    return date?.toLocaleTimeString('ru-RU')
  }, [])

  return (
    <StyledMain>
      {chatId && (
        <StyledHeader>
          <button onClick={closeСhat}>
            <ArrowBack />
          </button>
          <h2>Чат {chatId}</h2>
        </StyledHeader>
      )}

      {chatId ? (
        <>
          <ScrollContainer>
            <StyledContainer>
              <MessageContainer>
                {messages?.length ? (
                  messages?.map((message) => (
                    <StyledMessage $isOutgoing={message.type === 'outgoingAPIMessageReceived'}>
                      {message.text}
                      <time>{getDate(message.timestamp)}</time>
                    </StyledMessage>
                  ))
                ) : (
                  <NoContentText>Сообщений пока нет</NoContentText>
                )}
              </MessageContainer>
            </StyledContainer>
          </ScrollContainer>

          <StyledContainer>
            <StyledInputMessage>
              <StyledTextarea
                placeholder="Сообщение"
                value={messageText}
                onChange={(e) => {
                  setMessageText(e.target.value)
                }}
              />
              <SendButton type="button" onClick={sendMessage}>
                <ArrowUpward />
              </SendButton>
            </StyledInputMessage>
          </StyledContainer>
        </>
      ) : (
        <NoContentText>Создайте новый чат или выберите существующий</NoContentText>
      )}
    </StyledMain>
  )
}
