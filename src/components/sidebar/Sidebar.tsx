import { useState } from 'react'

import { StyledAside, StyledContainer } from './Sidebar.styles'
import { Menu } from './components/Menu'
import { Input } from '@shared/components/ui'
import { LocalStorage, useLocalStorage } from '../../shared/hooks'
import { API_URL } from '../../shared/constans'

export const Sidebar = () => {
  const [phone, setPhone] = useState('')
  const [value] = useLocalStorage(LocalStorage.InstanceInfo)

  const getChatIdByPhone = () => {
    if (!value) return
    const { idInstance, tokenInstance } = value as { idInstance: string; tokenInstance: string }
    console.log(idInstance, tokenInstance)
    fetch(`${API_URL}/waInstance${idInstance}/checkAccount/${tokenInstance}`, {
      method: 'POST',
      body: JSON.stringify({
        phoneNumber: phone,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((chatInfo) => {
        const { chatId } = chatInfo as {
          exist: true
          chatId: '10000000'
          fromCache: true
        }
        if (chatId) {
          createChat(chatId)
        }
      })
  }

  const createChat = (id: string) => {
    if (!value) return
    const { idInstance, tokenInstance } = value as { idInstance: string; tokenInstance: string }
    console.log(idInstance, tokenInstance)
    fetch(`${API_URL}/waInstance${idInstance}/sendMessage/${tokenInstance}`, {
      method: 'POST',
      body: JSON.stringify({
        chatId: id,
        message: 'Я использую GREEN-API для отправки этого сообщения! NEW',
      }), // данные могут быть 'строкой' или {объектом}!
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((data) => console.log(data))
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
        <button type="button" onClick={getChatIdByPhone} disabled={!(value && phone)}>
          Создать чат
        </button>
      </StyledContainer>
    </StyledAside>
  )
}
