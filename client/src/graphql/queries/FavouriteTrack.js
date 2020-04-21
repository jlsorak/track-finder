import { gql } from 'apollo-boost';

const FavouriteTracks = gql`
  query {
    favouriteTracks {
      id
      name
      artists {
        name
        uri
      }
      album {
        name
        images {
          height
          width
          url
        }
        uri
      }
      durationMs
      previewUrl
      uri
    }
  }
`

export default FavouriteTracks