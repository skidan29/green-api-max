import { Input } from '@shared/components/ui'
import { StyledButton, StyledForm } from './AuthForm.styles'
import { useCallback, useState, type ChangeEvent } from 'react'
import { LocalStorage, useLocalStorage } from '../../shared/hooks'
import { useNavigate } from 'react-router-dom'

interface AuthInfo {
  idInstance: string
  tokenInstance: string
}

export const AuthForm = () => {
  const [idInstance, setIdInstance] = useState('')
  const [tokenInstance, setTokenInstance] = useState('')
  const [, setStoredValue] = useLocalStorage<AuthInfo>(LocalStorage.InstanceInfo)
  const navigator = useNavigate()

  const submit = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault()

      setStoredValue({ idInstance, tokenInstance })
      navigator('/')
    },
    [setStoredValue, idInstance, tokenInstance, navigator]
  )

  return (
    <StyledForm onSubmit={submit}>
      <h1>Введите уникальный номер инстанса и токен</h1>
      <Input
        type="number"
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

      <StyledButton disabled={!(idInstance && tokenInstance)}>Войти</StyledButton>
    </StyledForm>
  )
}
