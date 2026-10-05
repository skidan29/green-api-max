import { ChatArea } from '../../components/chatArea/ChatArea'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Background, FlexContainer } from './Chat.styles'

export const Chat = () => {
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
