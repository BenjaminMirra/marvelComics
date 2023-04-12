import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ComicCard from './Comic';
import { Comic } from 'types/comic';
import { Characters } from 'types/character';

const comic: Comic = {
    id: 1,
    title: 'Test Comic',
    description: 'This is a test comic',
    price: 10,
    oldPrice: 100,
    thumbnail: {
        path: 'http://example.com',
        extension: 'jpg',
    },
    stock: 0,
};

const characters: Characters = [
    {
        id: 1,
        name: 'Test Character 1',
        description: 'This is a test comic',
        thumbnail: {
            path: 'http://example.com',
            extension: 'jpg',
        },
        comics: {
            items: []
        }
    },
    {
        id: 2,
        name: 'Test Character 2',
        description: 'This is a test comic',
        thumbnail: {
            path: 'http://example.com',
            extension: 'jpg',
        },
        comics: {
            items: []
        }
    },
];

describe('ComicCard', () => {
    test('should render comic description and price ', () => {
        const { getByText } = render(<ComicCard comic={comic} characters={characters} />);
        expect(getByText(`"${comic.description}"`)).toBeInTheDocument();
        expect(getByText(`$${comic.price}.00`)).toBeInTheDocument();
    });

    test('should show old price if comic has a discount', async () => {
        const { getByText } = render(<ComicCard comic={comic} characters={characters} />);
            expect(getByText(`$${comic.oldPrice}.00`)).toBeInTheDocument();
    });

    test('should show "SIN STOCK DISPONIBLE" button if stock is zero', () => {
        const { getByText } = render(<ComicCard comic={ comic } characters={characters} />);
        expect(getByText('SIN STOCK DISPONIBLE')).toBeDisabled();
    });
});