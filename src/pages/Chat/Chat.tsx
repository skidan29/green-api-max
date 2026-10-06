import { useEffect } from 'react'
import { ChatArea } from '../../components/chatArea/ChatArea'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { LocalStorage, useLocalStorage } from '../../shared/hooks'
import { Background, FlexContainer } from './Chat.styles'
import { useNavigate } from 'react-router-dom'

export const Chat = () => {
  const [value] = useLocalStorage(LocalStorage.InstanceInfo)
  const navigator = useNavigate()

  useEffect(() => {
    if (!value) {
      navigator('/login')
    }
  }, [navigator, value])

  return (
    <>
      <FlexContainer>
        <Sidebar></Sidebar>
        <ChatArea></ChatArea>
      </FlexContainer>
      <Background />
    </>
  )
}
