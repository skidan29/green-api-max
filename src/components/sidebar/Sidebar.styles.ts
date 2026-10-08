import styled from 'styled-components'

export const StyledAside = styled.aside`
  display: flex;
  height: 100dvh;
  background: var(--bg);
  z-index: 1;
  border-right: 1px solid var(--border);
  grid-area: aside;
  position: relative;
`

export const StyledContainer = styled.div`
  width: 398px;
  padding: 16px 8px;
`
export const StyledButton = styled.button`
  width: 100%;
  background-color: #007aff;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: var(--white);
  border-radius: 8px;
  padding: 12px 16px;
  text-align: center;
  margin-top: 16px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
  }
`

export const StyledChatItem = styled.div`
  margin-top: 16px;
  background-color: var(--white);
  border: 1px solid var(--border);
  width: 100%;
  border-radius: 8px;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  & div {
    padding: 4px 0;
  }

  & span {
    margin-top: 8px;
    color: grey;
  }
`
export const StyledDelete = styled.button`
  border: none;
  color: red;
  cursor: pointer;
  background-color: transparent;
`
