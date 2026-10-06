import { ExitIcon } from '@shared/components/icons'
import { StyledButton, StyledMenu } from './Menu.styles'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'

export const Menu = () => {
  const nvigate = useNavigate()

  const logout = useCallback(() => {
    nvigate('/login')
  }, [nvigate])

  return (
    <StyledMenu>
      <StyledButton onClick={logout}>
        <ExitIcon />
        <span>Выйти</span>
      </StyledButton>
    </StyledMenu>
  )
}
