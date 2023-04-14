import { render } from '@testing-library/react';
import CheckoutComic from './CheckoutComic';
import { OrderType } from 'types/order';

jest.mock("next/router", () => ({
  useRouter() {
      return {
          push: jest.fn()
      }
  }
}))

describe('CheckoutComic', () => {
  it('renders the correct image, name, and price', () => {
    const order : OrderType = {
        image: 'https://example.com/image.jpg',
        name: 'The Amazing Spider-Man',
        price: 9,
    };

    const { getByAltText, getByText } = render(<CheckoutComic order={order} />);

    expect(getByAltText('The Amazing Spider-Man')).toBeInTheDocument();
    expect(getByText('The Amazing Spider-Man')).toBeInTheDocument();
    expect(getByText('$9.00')).toBeInTheDocument();
  });
});