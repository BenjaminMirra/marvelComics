export type item = {
    resourceURI: string,
    name: string,
}

export type Character = {
    id: number,
    name: string,
    description: string,
    thumbnail: {
        path: string,
        extension: string
    },
    comics:{
        items: item[]
    }
};

export type Characters = Character[];