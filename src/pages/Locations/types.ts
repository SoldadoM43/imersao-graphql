export interface IGetLocations {
    locations: {
        results: IGetLocationsResult[]
    }
}

export interface IAuxLocations {
    name: string;
}

export interface IGetLocationsResult extends IAuxLocations {
    id: string;
}

export interface IGetLocationResult extends IAuxLocations {    
    type: string;
    dimension: string;
}

export interface IGetLocation {
    location: IGetLocationResult;
}

export interface IFilterGetLocation {
    filter: IAuxLocations;
}