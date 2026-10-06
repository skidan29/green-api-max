import styled from 'styled-components'

export const StyledForm = styled.form`
  width: 400px;
  border-radius: 16px;
  background-color: var(--bg);
  padding: 24px;
  row-gap: 24px;
  display: flex;
  flex-direction: column;
`
export const StyledButton = styled.button`
  background-color: #007aff;
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: var(--white);
  border-radius: 8px;
  padding: 16px 8px;
  text-align: center;
  margin-top: 100px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
  }
`
