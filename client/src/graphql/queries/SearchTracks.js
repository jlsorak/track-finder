import { gql } from 'apollo-boost'

const SearchTracks = gql`
  query (
    $searchTerm: String!
  ) {
    searchTracks(
      searchTerm: $searchTerm
    ) {
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

export default SearchTracks
