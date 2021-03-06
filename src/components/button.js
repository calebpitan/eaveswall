import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Button = styled.button`
  display: inline-block;
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({theme: {main}}) => main?.fg || '#000000'};
  text-align: center;
  white-space: normal;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  background-color: transparent;
  border-radius: 0.25rem;
  padding: 0.4rem 1rem;
  transition: all ease .4s;
  background-color: ${({theme: {main}}) => main?.bg || '#ffffff'};
  box-shadow: 0 0.2rem 0.728rem 0.2rem ${({theme: {main}}) => main?.shade || '#f9f9f9'};
  &:hover {
    color: currentColor;
    text-decoration: none;
    background-color: ${({theme: {main}}) => main?.bgFair || '#f1f1f1'};
  }
`

export const LinkButton = ({to, children, text, ...rest}) => (
  <Button as={Link} to={to} {...rest}>{children || text}</Button>
)

export const LinkButtonGeneric = ({to, children, text, ...rest}) => (
  <Button as="a" href={to} {...rest}>{children || text}</Button>
)

export default Button
