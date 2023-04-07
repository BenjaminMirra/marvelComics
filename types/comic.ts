export type Comic = {
    id: number,
    title: string,
    description: string
    thumbnail: {
        path: string,
        extension: string
    },
    price: number | any,
    oldPrice: number | any,
    stock: number | any
};

export type Comics = Comic[];