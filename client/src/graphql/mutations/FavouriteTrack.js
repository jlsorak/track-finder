import { gql } from 'apollo-boost'

const FavouriteTrack = gql`
  mutation (
    $id: String!
  ) {
    favouriteTrack(
      id: $id
    ) {
      id
    }
  }
`

export default FavouriteTrack
