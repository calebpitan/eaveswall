import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const TocLink = styled.a`
  font-weight: 500;
  font-family: 'Roboto';
  font-size: .9rem;
  color: ${({theme: {main}}) => main.fgFair};
  &:hover,
  &:active {
    color: rgb(34, 139, 236);
    text-decoration: none;
  }
`

function CreateTOC({ items, depth = 0 }) {
  return (
    <>
      <ul
        className="list-unstyled"
        style={{ padding: `0 0 0 ${1 * depth}rem` }}
      >
        {items.map(({ url, title, items: nestedItems }, index) => {
          return nestedItems === null || nestedItems === undefined ? (
            <li className="text-truncate" key={index}>
              <TocLink href={`${url}`}>
                {title}
              </TocLink>
            </li>
          ) : (
            <React.Fragment key={index}>
              {url && (
                <li className="text-truncate" key={index}>
                  <TocLink href={`${url}`}>
                    {title}
                  </TocLink>
                </li>
              )}
              <li>
                <CreateTOC items={nestedItems} depth={depth + 1} />
              </li>
            </React.Fragment>
          )
        })}
      </ul>
    </>
  )
}

export default CreateTOC
