import type { ChangeEvent } from 'react'

import { InputStyle } from './Input.styles'

interface Props {
  value: string | number | readonly string[]
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
  minLength?: number
}

export const Input = ({ value, onChange, placeholder, type, minLength }: Props) => (
  <InputStyle
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    type={type}
    minLength={minLength}
  />
)
