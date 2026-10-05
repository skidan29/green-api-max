import { useState } from 'react'

import { StyledAside, StyledContainer } from './Sidebar.styles'
import { Menu } from './components/Menu'
import { Input } from '../../shared/components/ui/input/Input'

export const Sidebar = () => {
  const [phone, setPhone] = useState('')

  return (
    <StyledAside>
      <Menu />
      <StyledContainer>
        <Input
          placeholder="Введите номер"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </StyledContainer>
    </StyledAside>
  )
}
