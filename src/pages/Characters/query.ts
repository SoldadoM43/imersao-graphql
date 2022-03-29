import { gql } from "@apollo/client";

export const GET_CHARACTERS_FILTER = gql`
query GetCharactersWithFilter($filter: FilterCharacter, $page: Int) {
  characters(filter: $filter, page: $page) {
    info {
      next
      prev
    }
    results {
      id
      name
      status
      image
    }
  }
}
`

export const GET_CHARACTER = gql`
query GetCharacter($characterId: ID!) {
  character(id: $characterId) {
    name
    status
    species
    type
    gender
    image
    origin {
      name
      type
      dimension
    }
  }
}
`