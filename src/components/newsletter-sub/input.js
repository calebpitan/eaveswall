// import React from "react"
import styled from "styled-components"
import { BREAKPOINTS } from "../theme"

const Input = styled.input`
  padding: 0.4rem 1rem;
  border-radius: 7px;
  color: ${({ theme: { main } }) => main.day ? `#000` : `#fff`};
  color: #000;
  background-color: ${({ theme: { main } }) => main.bg};
  background-color: #fff;
  border: 1px solid ${({ theme: { main } }) => main.shade};
  width: 190px;
  width: 100%;
  transition: box-shadow ease 0.4s;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.1rem ${({ theme: { primary, secondary, main } }) => main.day ? primary : secondary};
  }
  @media (min-width: ${BREAKPOINTS.md}px) {
    width: 190px;
    transition: width ease 0.4s, box-shadow ease 0.4s;
    &:focus {
      width: 250px;
    }
  }
`

const SubmitButton = styled(Input)`
  background-color: ${({ theme: { primary, secondary, main } }) => main.day ? primary : secondary};
  color: ${({ theme: { main } }) => main.day ? `#fff` : `#000`};
  text-align: center;
  font-weight: 500;
  position: relative;
  &:hover:not(:disabled) {
    background-color: ${({ theme: { primaryLight, secondaryLight, main } }) => main.day ? primaryLight : secondaryLight};
  }
  &:disabled {
    opacity: 0.7;
  }
`

export { SubmitButton }
export default Input
