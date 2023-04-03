import { createContext, useState, ReactNode } from 'react';

type ComicType = {
    id: number,
    title: string;
    description: string,
    thumbnail: {
        path: string,
        extension: string,
    },
    price: number,
    stock: number
}

type ComicContextType = {
    comic: ComicType;
    updateComic: (comic: ComicType) => void;
}

export const ComicContext = createContext<ComicContextType | undefined>(undefined);

type ComicProviderProps = {
    children: ReactNode;
};

export const ComicProvider = ({ children }: ComicProviderProps) => {
    const [comic, setComic] = useState<ComicType>({id: 0, title: '', description: '', thumbnail:{
        path: "", 
        extension: ""
    },price: 0, stock:0  });

    const updateComic = (newComic: ComicType) => {
        setComic(newComic);
    };

    const value = { comic, updateComic };

    return <ComicContext.Provider value={value}>{children}</ComicContext.Provider>;
};
