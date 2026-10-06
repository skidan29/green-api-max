import { Input } from '@shared/components/ui'
import { StyledButton, StyledForm } from './AuthForm.styles'
import { useCallback, useState, type ChangeEvent } from 'react'

export const AuthForm = () => {
  const [idInstance, setIdInstance] = useState('')
  const [tokenInstance, setTokenInstance] = useState('')

  const submit = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault()

      console.log(idInstance, tokenInstance)
    },
    [idInstance, tokenInstance]
  )

  return (
    <StyledForm onSubmit={submit}>
      <h1>Введите уникальный номер инстанса и токен</h1>
      <Input
        placeholder="Введите ID "
        value={idInstance}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setIdInstance(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Введите токен"
        value={tokenInstance}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTokenInstance(e.target.value)}
      />
      <StyledButton>Войти</StyledButton>
    </StyledForm>
  )
}
