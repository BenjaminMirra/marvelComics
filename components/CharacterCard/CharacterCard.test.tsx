import React from 'react';
import { render, waitFor } from '@testing-library/react';
import CharacterCard from './CharacterCard';
import { Character } from 'types/character';
import { Comics } from 'types/comic';


test('renders character information correctly', () => {
    const comics: Comics = [{
        id: 1,
        title: 'Incredible Hulks (2010) #604 (DJURDJEVIC 70TH ANNIVERSARY VARIANT)',
        description: 'This is a description of the comic',
        thumbnail: {
            path: 'https://example.com/image',
            extension: 'jpg',
        },
        price: 0,
        oldPrice: 0,
        stock: 0,
    }];
    const character: Character = {
        id: 123,
        name: 'Hulk',
        description: 'Caught in a gamma bomb explosion while trying to save the life of a teenager, Dr. Bruce Banner was transformed into the incredibly powerful creature called the Hulk. An all too often misunderstood hero, the angrier the Hulk gets, the stronger the Hulk gets.',
        thumbnail: {
            path: 'https://example.com/image',
            extension: 'jpg',
        },
        comics: {
            items: []
        }
    };

    const { getByText } = render(
        <CharacterCard character={character} comics={comics} />
    );

    const idElement = getByText(/123/i)
    const descriptionElement = getByText(/Caught in a gamma bomb explosion while trying to save the life of a teenager, Dr. Bruce Banner was transformed into the incredibly powerful creature called the Hulk. An all too often misunderstood hero, the angrier the Hulk gets, the stronger the Hulk gets./i);

    expect(idElement).toBeInTheDocument();;
    expect(descriptionElement).toBeInTheDocument();
});