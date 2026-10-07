import { useCallback, useState } from 'react'

import { StyledAside, StyledContainer } from './Sidebar.styles'
import { Menu } from './components/Menu'
import { Input } from '@shared/components/ui'
import { LocalStorage, useLocalStorage } from '../../shared/hooks'
import { API_URL } from '../../shared/constans'
import type { ChatInfo, ChatInfoWithPhone, Instance } from '../../shared/types'
import { useNavigate } from 'react-router-dom'

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
    const { idInstance, tokenInstance } = instance as { idInstance: string; tokenInstance: string }
    console.log(idInstance, tokenInstance)
    fetch(`${API_URL}/waInstance${idInstance}/checkAccount/${tokenInstance}`, {
      method: 'POST',
      body: JSON.stringify({
        phoneNumber: Number(phone),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((chatInfo: ChatInfo) => {
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
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="button" onClick={getChatIdByPhone} disabled={!(instance && phone)}>
          Создать чат
        </button>
        {chats &&
          chats.map((chat) => (
            <div
              key={chat.chatId}
              onClick={() => {
                navigate(`/${chat.chatId}`)
              }}
            >
              {chat.phoneNumber}: {chat.chatId}
              <button onClick={deleteChat(chat.chatId)}>del</button>
            </div>
          ))}
      </StyledContainer>
    </StyledAside>
  )
}
