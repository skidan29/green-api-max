import { Background, FlexContainer } from './App.styles'
import { ChatArea } from './components/chatArea/ChatArea'
import { Sidebar } from './components/sidebar/Sidebar'

function App() {
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

export default App
