import { gql } from 'apollo-boost';

const searchTracks = gql`
  query (
    $searchTerm: String!
  ) {
    searchTracks(
      searchTerm: $searchTerm
    ) {
      trackId
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

export default searchTracks