import type { ChangeEvent } from 'react'

import { InputStyle } from './Input.styles'

interface Props {
  value: string | number | readonly string[]
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
}

export const Input = ({ value, onChange, placeholder, type }: Props) => (
  <InputStyle value={value} onChange={onChange} placeholder={placeholder} type={type} />
)
