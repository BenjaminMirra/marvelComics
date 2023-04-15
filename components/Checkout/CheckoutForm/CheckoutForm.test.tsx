import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CheckoutForm from './CheckoutForm';
import { Alert, AlertProps } from '@mui/material';

jest.mock("next/router", () => ({
    useRouter() {
        return {
            push: jest.fn()
        }
    }
}))


describe('CheckoutForm', () => {
    it('should display the first step form when loaded', () => {
        render(<CheckoutForm />);
        expect(screen.getByText('Datos Personales')).toBeInTheDocument();
    });
    it('happy path', async () => {
        render(<CheckoutForm />);
        const name = screen.getByLabelText(/Nombre/);
        const surname = screen.getByLabelText(/Apellido/);
        const email = screen.getByLabelText(/Correo Electrónico/);
        const next = screen.getByRole('siguiente1');

        fireEvent.change(name, { target: { value: 'Benjamín' } });
        fireEvent.change(surname, { target: { value: 'Mirra' } });
        fireEvent.change(email, { target: { value: 'mirrabenjamin@gmail.com' } });
        fireEvent.click(next);

        //second step
        await waitFor(() => {
            const direccion = screen.getByLabelText(/Dirección/);
            const ciudad = screen.getByLabelText(/Ciudad/);
            const provincia = screen.getByLabelText(/Provincia/);
            const codigoPostal = screen.getByLabelText(/Código Postal/);
            fireEvent.change(direccion, { target: { value: 'Av. Presidente Perón' } });
            fireEvent.change(ciudad, { target: { value: 'Yerba Buena' } });
            fireEvent.change(provincia, { target: { value: 'Tucumán' } });
            fireEvent.change(codigoPostal, { target: { value: '4107' } });

        });
        const next2 = screen.getByRole('siguiente2')
        fireEvent.click(next2);

        await waitFor(() => {
            const cardNumber = screen.getByLabelText(/Numero de Tarjeta/);
            const cardName = screen.getByLabelText(/Nombre en la Tarjeta/);
            const cardDate = screen.getByLabelText(/Fecha de Expiración/);
            const cardCode = screen.getByLabelText(/Código de Seguridad/);

            fireEvent.change(cardNumber, { target: { value: '42424242 4242 4242' } });
            fireEvent.change(cardName, { target: { value: 'Benjamin Mirra' } });
            fireEvent.change(cardDate, { target: { value: '12/28' } });
            fireEvent.change(cardCode, { target: { value: '1234' } });

        });
        const submit = screen.getByRole('comprar');
        fireEvent.click(submit);
    });
    it('sad path, when Fecha de Expiración is empty', async () => {
        render(<CheckoutForm />);
        const name = screen.getByLabelText(/Nombre/);
        const surname = screen.getByLabelText(/Apellido/);
        const email = screen.getByLabelText(/Correo Electrónico/);
        const next = screen.getByRole('siguiente1');

        fireEvent.change(name, { target: { value: 'Benjamín' } });
        fireEvent.change(surname, { target: { value: 'Mirra' } });
        fireEvent.change(email, { target: { value: 'mirrabenjamin@gmail.com' } });
        fireEvent.click(next);

        //second step
        await waitFor(() => {
            const direccion = screen.getByLabelText(/Dirección/);
            const ciudad = screen.getByLabelText(/Ciudad/);
            const provincia = screen.getByLabelText(/Provincia/);
            const codigoPostal = screen.getByLabelText(/Código Postal/);
            fireEvent.change(direccion, { target: { value: 'Av. Presidente Perón' } });
            fireEvent.change(ciudad, { target: { value: 'Yerba Buena' } });
            fireEvent.change(provincia, { target: { value: 'Tucumán' } });
            fireEvent.change(codigoPostal, { target: { value: '2017' } });

        });

        const next2 = screen.getByRole('siguiente2');
        fireEvent.click(next2);

        await waitFor(() => {

            const cardNumber = screen.getByLabelText(/Numero de Tarjeta/);
            const cardName = screen.getByLabelText(/Nombre en la Tarjeta/);
            const cardDate = screen.getByLabelText(/Fecha de Expiración/);
            const cardCode = screen.getByLabelText(/Código de Seguridad/);

            fireEvent.change(cardNumber, { target: { value: '42424242 4242 4242' } });
            fireEvent.change(cardName, { target: { value: 'Benjamin Mirra' } });
            fireEvent.change(cardDate, { target: { value: '' } });
            fireEvent.change(cardCode, { target: { value: '1234' } });
        });

        const submit3 = screen.getByRole('comprar');
        fireEvent.click(submit3);
        await waitFor(() => {

            expect(screen.getByText('La Fecha de Expiración es requerida.')).toBeInTheDocument();
        });
    });
    it('backButons 1 and 2', async () => {
        render(<CheckoutForm />);
        const name = screen.getByLabelText(/Nombre/);
        const surname = screen.getByLabelText(/Apellido/);
        const email = screen.getByLabelText(/Correo Electrónico/);
        const next = screen.getByRole('siguiente1');

        fireEvent.change(name, { target: { value: 'Benjamín' } });
        fireEvent.change(surname, { target: { value: 'Mirra' } });
        fireEvent.change(email, { target: { value: 'mirrabenjamin@gmail.com' } });
        fireEvent.click(next);

        //second step
        await waitFor(() => {
            const direccion = screen.getByLabelText(/Dirección/);
            const ciudad = screen.getByLabelText(/Ciudad/);
            const provincia = screen.getByLabelText(/Provincia/);
            const codigoPostal = screen.getByLabelText(/Código Postal/);
            fireEvent.change(direccion, { target: { value: 'Av. Presidente Perón' } });
            fireEvent.change(ciudad, { target: { value: 'Yerba Buena' } });
            fireEvent.change(provincia, { target: { value: 'Tucumán' } });
            fireEvent.change(codigoPostal, { target: { value: '4107' } });

        });
        const back1 = screen.getByRole('atras1');
        fireEvent.click(back1);
        const next12 = screen.getByRole('siguiente1');
        fireEvent.click(next12);
        waitFor(() => {
            const next2 = screen.getByRole('siguiente2')
            fireEvent.click(next2);
        });
        await waitFor(() => {
            const cardNumber = screen.getByLabelText(/Numero de Tarjeta/);
            const cardName = screen.getByLabelText(/Nombre en la Tarjeta/);
            const cardDate = screen.getByLabelText(/Fecha de Expiración/);
            const cardCode = screen.getByLabelText(/Código de Seguridad/);

            fireEvent.change(cardNumber, { target: { value: '42424242 4242 4242' } });
            fireEvent.change(cardName, { target: { value: 'Benjamin Mirra' } });
            fireEvent.change(cardDate, { target: { value: '12/28' } });
            fireEvent.change(cardCode, { target: { value: '1234' } });

        });
        const back2 = screen.getByRole('atras2');
        fireEvent.click(back2);
        const next22 = screen.getByRole('siguiente2');
        fireEvent.click(next22);
        waitFor(() => {
            const submit = screen.getByRole('comprar');
            fireEvent.click(submit);
        });

    });
    it(`happy path third step, The card doesn't have the require amount to do the transfer.`, async () => {
        render(<CheckoutForm />);
        const name = screen.getByLabelText(/Nombre/);
        const surname = screen.getByLabelText(/Apellido/);
        const email = screen.getByLabelText(/Correo Electrónico/);
        const next = screen.getByRole('siguiente1');

        fireEvent.change(name, { target: { value: 'Benjamín' } });
        fireEvent.change(surname, { target: { value: 'Mirra' } });
        fireEvent.change(email, { target: { value: 'mirrabenjamin@gmail.com' } });
        fireEvent.click(next);

        //second step
        await waitFor(() => {
            const direccion = screen.getByLabelText(/Dirección/);
            const ciudad = screen.getByLabelText(/Ciudad/);
            const provincia = screen.getByLabelText(/Provincia/);
            const codigoPostal = screen.getByLabelText(/Código Postal/);
            fireEvent.change(direccion, { target: { value: 'Av. Presidente Perón' } });
            fireEvent.change(ciudad, { target: { value: 'Yerba Buena' } });
            fireEvent.change(provincia, { target: { value: 'Tucumán' } });
            fireEvent.change(codigoPostal, { target: { value: '2017' } });

        });

        const next2 = screen.getByRole('siguiente2');
        fireEvent.click(next2);

        await waitFor(() => {

            const cardNumber = screen.getByRole('textbox', {
                name: /numero de tarjeta/i
            })
            const cardName = screen.getByLabelText(/Nombre en la Tarjeta/);
            const cardDate = screen.getByLabelText(/Fecha de Expiración/);
            const cardCode = screen.getByLabelText(/Código de Seguridad/);
            fireEvent.change(cardName, { target: { value: 'Benjamin Mirra' } });
            fireEvent.change(cardNumber, { target: { value: '12345678' } });
            fireEvent.change(cardDate, { target: { value: '12/28' } });
            fireEvent.change(cardCode, { target: { value: '1234' } });
        });

        const submit3 = screen.getByRole('comprar');
        fireEvent.click(submit3);
        await waitFor(() => {
        });
    });
});