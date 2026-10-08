import { useCallback, useState } from 'react'

import {
  StyledAside,
  StyledButton,
  StyledChatItem,
  StyledContainer,
  StyledDelete,
} from './Sidebar.styles'
import { Menu } from './components/Menu'
import { Input } from '@shared/components/ui'
import { LocalStorage, useLocalStorage } from '../../shared/hooks'
import { checkAccount } from '../../api'
import type { ChatInfo, ChatInfoWithPhone, Instance } from '../../shared/types'
import { useNavigate } from 'react-router-dom'
import { DeleteIcon } from '@shared/components/icons'

export const Sidebar = () => {
  const [phone, setPhone] = useState('')
  const [instance] = useLocalStorage<Instance>(LocalStorage.InstanceInfo)
  const [chats, setChats] = useLocalStorage<ChatInfoWithPhone[]>(LocalStorage.Chats)
  const navigate = useNavigate()

  const addChat = useCallback(
    (chat: ChatInfoWithPhone) => {
      setChats((prev) => (prev ? [...prev, chat] : [chat]))
    },
    [setChats]
  )

  const deleteChat = useCallback(
    (chatId: string) => () => {
      setChats((prev) => (prev ? prev.filter((chat) => chat.chatId !== chatId) : null))
    },
    [setChats]
  )

  const getChatIdByPhone = () => {
    if (!instance) return
    const { idInstance, tokenInstance } = instance
    console.log(idInstance, tokenInstance)
    checkAccount(instance, phone).then((chatInfo: ChatInfo) => {
      const { chatId } = chatInfo

      if (chatInfo && chatId) {
        const chatInfoWithPhone: ChatInfoWithPhone = { ...chatInfo, phoneNumber: Number(phone) }
        addChat(chatInfoWithPhone)
        setPhone('')
        navigate(`/${chatId}`)
      }
    })
  }

  return (
    <StyledAside>
      <Menu />
      <StyledContainer>
        <h1>Чаты</h1>
        <Input
          placeholder="Введите номер"
          value={phone}
          type="phone"
          minLength={11}
          onChange={(e) => setPhone(e.target.value)}
        />
        <StyledButton type="button" onClick={getChatIdByPhone} disabled={!(phone?.length > 10)}>
          Создать новый чат
        </StyledButton>
        {chats &&
          chats.map((chat) => (
            <StyledChatItem
              key={chat.chatId}
              onClick={() => {
                navigate(`/${chat.chatId}`)
              }}
            >
              <div>
                <div>Номер телефона: {chat.phoneNumber}</div>
                <span>Идентификатор чата: {chat.chatId}</span>
              </div>

              <StyledDelete onClick={deleteChat(chat.chatId)}>
                <DeleteIcon />
              </StyledDelete>
            </StyledChatItem>
          ))}
      </StyledContainer>
    </StyledAside>
  )
}
