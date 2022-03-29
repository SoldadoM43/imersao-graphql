import { IPaginable } from "../../utils/types"
import { IGetLocationResult } from "../Locations/types";

export interface IGetCharactersList {
    characters: {
        info: IPaginable
        results: ICharacterList[]
    }
}

export interface IAuxCharacter {
    name: string;
    status: string;
    image: string;
}

export interface ICharacterList extends IAuxCharacter {
    id: string;    
}


export interface ICharacterItem extends IAuxCharacter {
    species: string
    type: string
    gender: string
    origin: IGetLocationResult
}

export interface IGetCharacter {
    character: ICharacterItem
}

export interface IGetCharacterFilter {
    characterId: string;
}