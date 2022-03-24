import { gql } from "@apollo/client";

export const GET_EPISODES_FILTER = gql`
query GetEpisodes($page: Int, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
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

export const GET_EPISODE = gql`
query GetEpisode($episodeId: ID!) {
    episode(id: $episodeId) {
        id
        name
        air_date
        episode
        created
    }
}
`