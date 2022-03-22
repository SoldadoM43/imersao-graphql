export interface IBoxOptions {
    title: string;
    image: string;
    count: number;
    link: string;
}

export interface IGetCount {    
    characters:IInfoCount
    locations: IInfoCount
    episodes: IInfoCount    
}

export interface IInfoCount {
    info: {
        count: number;
    }
}