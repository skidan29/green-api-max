import styled, { css } from 'styled-components'

export const StyledMain = styled.main`
  position: relative;
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
`
export const StyledHeader = styled.header`
  width: 100%;
  height: 64px;
  display: flex;
  background: var(--white);
  border-bottom: 1px solid var(--border);
  align-items: center;
  padding: 16px 16px;
  column-gap: 16px;
`
export const StyledContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`

export const StyledInputMessage = styled.div`
  margin-bottom: 16px;
  padding: 16px;
  background-color: var(--white);
  border: 1px solid var(--border);
  border-radius: 16px;
  min-height: 48px;
  height: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  column-gap: 24px;
`
export const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 68px;
  resize: none;
  border: none;
  padding: 0 8px;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`

export const SendButton = styled.button`
  background-color: rgb(0, 122, 255);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  fill: var(--white);
`
export const ScrollContainer = styled.div`
  width: 100%;
  overflow-y: auto;
  height: 100%;
`

export const MessageContainer = styled.div`
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  row-gap: 16px;
`
export const StyledMessage = styled.div<{ $isOutgoing?: boolean }>`
  position: relative;
  background-color: var(--white);
  border: 1px solid var(--border);
  max-width: 490px;
  border-radius: 8px;
  padding: 16px;
  display: flex;

  & time {
    color: gray;
    font-size: 10px;
    position: absolute;
    bottom: 4px;
    right: 8px;
  }

  ${({ $isOutgoing }) =>
    $isOutgoing &&
    css`
      background: #d7e8d5;
      align-self: flex-end;
    `}
`
export const NoContentText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 18px;
  font-weight: 500;
  transform: translate(-50%, -50%);
  background-color: var(--white);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
`
