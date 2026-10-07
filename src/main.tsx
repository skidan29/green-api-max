import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Chat } from './pages/Chat/Chat'
import { Auth } from './pages/Auth/Auth'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/:chatId?" element={<Chat />} />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
