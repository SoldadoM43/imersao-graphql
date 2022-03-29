export interface IPaginable {
    next?: number;
    prev?: number;
}

export interface IFilter {
    filter: {
        name: string;
    }
    page: number;
}