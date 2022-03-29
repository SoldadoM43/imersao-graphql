import { IPaginable } from "../../utils/types";

export interface IGetEpisodes {
    episodes: {
        info: IPaginable;
        results: IAuxEpisodes[]
    }
}

export interface IAuxEpisodes {
    id: string
    name: string
}

export interface IEpisode extends IAuxEpisodes {
    air_date: string
    episode: string
    created: string
}

export interface IGetEpisode {
    episode: IEpisode;    
}

export interface IGetEpisodeFilter {
    episodeId: string;
}