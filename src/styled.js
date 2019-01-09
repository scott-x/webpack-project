import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const FadeInButton = styled.button`
  animation: 1s ${fadeIn} ease-out;
`
export const Hello=styled.div`
  background:red;
`