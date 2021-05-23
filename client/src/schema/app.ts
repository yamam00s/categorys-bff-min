import { gql } from '@apollo/client'

export const GET_CONTENTS = gql`
  query contents {
    contents {
      id
      title
    }
  }
`
