export type Item = {
    role: string,
    name: string
}

export type Comic = {
    id: number,
    title: string,
    description: string
    thumbnail: {
        path: string,
        extension: string
    },
    creators: {
        items: Item[],
    }
    price: number | any,
    oldPrice: number | any,
    stock: number | any
};

export type Comics = Comic[];