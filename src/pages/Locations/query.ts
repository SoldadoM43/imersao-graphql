import { gql } from "@apollo/client";

export const GET_LOCATIONS_FILTER = gql`
query GetLocationsWithFilter($filter: FilterLocation, $page: Int) {
    locations(filter: $filter, page: $page) {
        info {
            next
            prev
        }
        results {
            id
            name
        }
    }
}
`

export const GET_LOCATIONS = gql`
query GetLocations {
    locations {
        results {
            id
            name
        }
    }
}`

export const GET_LOCATION = gql`
query Location($locationId: ID!) {
    location(id: $locationId) {
      name
      type
      dimension
    }
}`