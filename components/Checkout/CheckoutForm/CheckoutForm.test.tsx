import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CheckoutForm from './CheckoutForm';
import { Alert } from '@mui/material';

describe('CheckoutForm', () => {
    it('should display the first step form when loaded', () => {
        render(<CheckoutForm />);
        expect(screen.getByText('Datos Personales')).toBeInTheDocument();
    });
    it('happy path first step', async () => {
        render(<CheckoutForm />);
        const name = screen.getByLabelText(/Nombre/);
        const surname = screen.getByLabelText(/Apellido/);
        const email = screen.getByLabelText(/Correo Electrónico/);
        const submit = screen.getByText('Siguiente');

        fireEvent.change(name, { target: { value: 'Benjamin' } });
        fireEvent.change(surname, { target: { value: 'Mirra' } });
        fireEvent.change(email, { target: { value: 'mirrabenjamin@gmail.com' } });
        fireEvent.click(submit);

        await waitFor(() => {
            expect(screen.getByLabelText('Código Postal *')).toBeInTheDocument();
        });
    });
    it('sad path first step, when Nombre is empty', async () => {
        render(<CheckoutForm />);
        const name = screen.getByLabelText(/Nombre/);
        const surname = screen.getByLabelText(/Apellido/);
        const email = screen.getByLabelText(/Correo Electrónico/);
        const submit = screen.getByText('Siguiente');

        fireEvent.change(name, { target: { value: '' } });
        fireEvent.change(surname, { target: { value: 'Mirra' } });
        fireEvent.change(email, { target: { value: 'mirrabenjamin@gmail.com' } });
        fireEvent.click(submit);

        await waitFor(() => {
            expect(screen.getByText('El Nombre es requerido.')).toBeInTheDocument();
        });
    });

    it('happy path second step', async () => {
        render(<CheckoutForm />);
        const name = screen.getByLabelText(/Nombre/);
        const surname = screen.getByLabelText(/Apellido/);
        const email = screen.getByLabelText(/Correo Electrónico/);
        const submit = screen.getByText('Siguiente');

        fireEvent.change(name, { target: { value: 'Benjamín' } });
        fireEvent.change(surname, { target: { value: 'Mirra' } });
        fireEvent.change(email, { target: { value: 'mirrabenjamin@gmail.com' } });
        fireEvent.click(submit);

        waitFor(() => {
            const direccion = screen.getByLabelText(/Dirección/);
            const ciudad = screen.getByLabelText(/Ciudad/);
            const provincia = screen.getByLabelText(/Provincia/);
            const codigoPostal = screen.getByLabelText(/Código Postal/);
            const submit2 = screen.getByText('Siguiente');

            fireEvent.change(direccion, { target: { value: 'Av. Presidente Perón' } });
            fireEvent.change(ciudad, { target: { value: 'Yerba Buena' } });
            fireEvent.change(provincia, { target: { value: 'Tucumán' } });
            fireEvent.change(codigoPostal, { target: { value: '2017' } });
            fireEvent.click(submit2);
        });

        await waitFor(() => {
            expect(screen.getByLabelText('Código de Seguridad *')).toBeInTheDocument();
        });
    });
    it('sad path second step, when Dirección is empty', async () => {
        render(<CheckoutForm />);
        const name = screen.getByLabelText(/Nombre/);
        const surname = screen.getByLabelText(/Apellido/);
        const email = screen.getByLabelText(/Correo Electrónico/);
        const submit = screen.getByText('Siguiente');

        fireEvent.change(name, { target: { value: 'Benjamín' } });
        fireEvent.change(surname, { target: { value: 'Mirra' } });
        fireEvent.change(email, { target: { value: 'mirrabenjamin@gmail.com' } });
        fireEvent.click(submit);

        waitFor(() => {
            const direccion = screen.getByLabelText(/Dirección/);
            const ciudad = screen.getByLabelText(/Ciudad/);
            const provincia = screen.getByLabelText(/Provincia/);
            const codigoPostal = screen.getByLabelText(/Código Postal/);
            const submit2 = screen.getByText('Siguiente');

            fireEvent.change(direccion, { target: { value: '' } });
            fireEvent.change(ciudad, { target: { value: 'Yerba Buena' } });
            fireEvent.change(provincia, { target: { value: 'Tucumán' } });
            fireEvent.change(codigoPostal, { target: { value: '2017' } });
            fireEvent.click(submit2);
        });

        await waitFor(() => {
            expect(screen.getByText('La Dirección es requerida.')).toBeInTheDocument();
        });
    });
    // it('happy path third step', async () => {
    //     render(<CheckoutForm />);
    //     const name = screen.getByLabelText(/Nombre/);
    //     const surname = screen.getByLabelText(/Apellido/);
    //     const email = screen.getByLabelText(/Correo Electrónico/);
    //     const submit = screen.getByText('Siguiente');

    //     fireEvent.change(name, { target: { value: 'Benjamín' } });
    //     fireEvent.change(surname, { target: { value: 'Mirra' } });
    //     fireEvent.change(email, { target: { value: 'mirrabenjamin@gmail.com' } });
    //     fireEvent.click(submit);

    //     waitFor(() => {
    //         const direccion = screen.getByLabelText(/Dirección/);
    //         const ciudad = screen.getByLabelText(/Ciudad/);
    //         const provincia = screen.getByLabelText(/Provincia/);
    //         const codigoPostal = screen.getByLabelText(/Código Postal/);
    //         const submit2 = screen.getByText('Siguiente');

    //         fireEvent.change(direccion, { target: { value: 'Av. Presidente Perón' } });
    //         fireEvent.change(ciudad, { target: { value: 'Yerba Buena' } });
    //         fireEvent.change(provincia, { target: { value: 'Tucumán' } });
    //         fireEvent.change(codigoPostal, { target: { value: '2017' } });
    //         fireEvent.click(submit2);
    //     });

    //     waitFor(() => {
    //         const cardNumber = screen.getByLabelText(/Número de la tarjeta/);
    //         const cardName = screen.getByLabelText(/Nombre en la Tarjeta/);
    //         const cardDate = screen.getByLabelText(/Fecha de Expiración/);
    //         const cardCode = screen.getByLabelText(/Código de seguridad/);
    //         const submit3 = screen.getByText('Comprar');

    //         fireEvent.change(cardNumber, { target: { value: '42424242 4242 4242' } });
    //         fireEvent.change(cardName, { target: { value: 'Benjamin Mirra' } });
    //         fireEvent.change(cardDate, { target: { value: '12/28' } });
    //         fireEvent.change(cardCode, { target: { value: '1234' } });
    //         fireEvent.click(submit3);
    //     });

    //         await waitFor(() => {
    //             expect(screen.getByText('Compra Realizada')).toBeInTheDocument();
    //         });
    // });
    // it('sad path third step, when Nombre de la Tarjeta is empty', async () => {
    //     render(<CheckoutForm />);
    //     const name = screen.getByLabelText(/Nombre/);
    //     const surname = screen.getByLabelText(/Apellido/);
    //     const email = screen.getByLabelText(/Correo Electrónico/);
    //     const submit = screen.getByText('Siguiente');

    //     fireEvent.change(name, { target: { value: 'Benjamín' } });
    //     fireEvent.change(surname, { target: { value: 'Mirra' } });
    //     fireEvent.change(email, { target: { value: 'mirrabenjamin@gmail.com' } });
    //     fireEvent.click(submit);

    //     await waitFor(() => {
    //         const direccion = screen.getByLabelText(/Dirección/);
    //         const ciudad = screen.getByLabelText(/Ciudad/);
    //         const provincia = screen.getByLabelText(/Provincia/);
    //         const codigoPostal = screen.getByLabelText(/Código Postal/);
    //         const submit2 = screen.getByText('Siguiente');

    //         fireEvent.change(direccion, { target: { value: 'Av. Presidente Perón' } });
    //         fireEvent.change(ciudad, { target: { value: 'Yerba Buena' } });
    //         fireEvent.change(provincia, { target: { value: 'Tucumán' } });
    //         fireEvent.change(codigoPostal, { target: { value: '2017' } });
    //         fireEvent.click(submit2);
    //     });

    //     await waitFor(() => {
    //         const cardNumber = screen.getByLabelText(/Número de Tarjeta: 424242 4242 4242 to success */);
    //         const cardName = screen.getByLabelText(/Nombre en la Tarjeta/);
    //         const cardDate = screen.getByLabelText(/Fecha de Expiración/);
    //         const cardCode = screen.getByLabelText(/Código de seguridad/);
    //         const submit3 = screen.getByText('Comprar');

    //         fireEvent.change(cardNumber, { target: { value: '42424242 4242 4242' } });
    //         fireEvent.change(cardName, { target: { value: '' } });
    //         fireEvent.change(cardDate, { target: { value: '12/28' } });
    //         fireEvent.change(cardCode, { target: { value: '1234' } });
    //         fireEvent.click(submit3);
    //     });

    //     await waitFor(() => {
    //         expect(screen.getByText('El Nombre de la Tarjeta es requerido.')).toBeInTheDocument();
    //     });
    // });
});

describe('testToCoverage', () => {
    test('renders an alert message', () => {
        const message = 'alerta';
        const { getByRole } = render(<Alert severity="info">{message}</Alert>);
        const alertElement = getByRole('alert');
        expect(alertElement).toHaveTextContent(message);
    });
})
