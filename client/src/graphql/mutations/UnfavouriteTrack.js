import { gql } from 'apollo-boost';

const UnfavouriteTrack = gql`
  mutation (
    $id: String!
  ) {
    unfavouriteTrack(
      id: $id
    ) {
      id
    }
  }
`

export default UnfavouriteTrack