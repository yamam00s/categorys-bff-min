import { gql } from '@apollo/client'

export const GET_CONTENTS = gql`
  query GetContents {
    contents {
      id
      title
    }
  }
`
