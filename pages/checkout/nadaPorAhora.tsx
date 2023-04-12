// import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// import Checkout from "./index.page"

// describe("App", () => {
//   // test("should render the basic fields", () => {
//   //   render(<Checkout />);
//   //   expect(screen.getByRole("textbox", { name: /nombre/i })).toBeInTheDocument();
//   //   expect(
//   //     screen.getByRole("textbox", { name: /apellido/i })
//   //   ).toBeInTheDocument();
//   //   expect(
//   //     screen.getByRole("textbox", { name: /correo electrónico/i })
//   //   ).toBeInTheDocument();
//   //   expect(
//   //     screen.getByRole("button", { name: /siguiente/i })
//   //   ).toBeInTheDocument();
//   // });
//   it('shows error message when "Nombre" field is empty', async () => {
//     const { getByLabelText, getByRole, getByText } = render(<Checkout />);

//     const botonSiguiente = getByRole("button", { name: /siguiente/i })
//     const inputNombre = getByLabelText('Nombre *')
//     const inputApellido = getByLabelText('Apellido *')
//     const inputEmail = getByLabelText('Correo Electrónico *')

//     fireEvent.change(inputNombre, { target: { value: '' } });
//     fireEvent.change(inputApellido, { target: { value: 'Mirra' } });
//     fireEvent.change(inputEmail, { target: { value: "mirrabenjamin@gmail.com" } });
//     fireEvent.click(botonSiguiente)

//     await waitFor(() =>
//       getByText('El Nombre es requerido.'))
//   });
//   it('Happy path first step', async () => {
//     const { getByLabelText, getByRole, getByText } = render(<Checkout />);

//     const botonSiguiente = getByRole("button", { name: /siguiente/i })
//     const inputNombre = getByLabelText('Nombre *')
//     const inputApellido = getByLabelText('Apellido *')
//     const inputEmail = getByLabelText('Correo Electrónico *')

//     fireEvent.change(inputNombre, { target: { value: 'Benjamín' } });
//     fireEvent.change(inputApellido, { target: { value: 'Mirra' } });
//     fireEvent.change(inputEmail, { target: { value: "mirrabenjamin@gmail.com" } });
//     fireEvent.click(botonSiguiente)

//     await waitFor(() =>
//       getByLabelText('Dirección *'))
//   });
//   // it('shows error message when "Dirección" field is empty', async () => {
//   //   const { getByLabelText, getByRole, getByText } = render(<Checkout />);

//   //   const botonSiguiente = getByRole("button", { name: /siguiente/i })
//   //   const inputNombre = getByLabelText('Nombre *')
//   //   const inputApellido = getByLabelText('Apellido *')
//   //   const inputEmail = getByLabelText('Correo Electrónico *')


//   //   fireEvent.change(inputNombre, { target: { value: 'Benjamin' } });
//   //   fireEvent.change(inputApellido, { target: { value: 'Mirra' } });
//   //   fireEvent.change(inputEmail, { target: { value: "mirrabenjamin@gmail.com" } });
//   //   fireEvent.click(botonSiguiente)



//   //   await waitFor(() =>{
//   //     const botonSiguiente2 = getByRole("button", { name: /siguiente/i })
//   //     const inputDireccion = getByLabelText('Dirección *')
//   //     const inputCiudad = getByLabelText('Ciudad *')
//   //     const inputProvincia = getByLabelText('Provincia *')
//   //     const inputCodigoPostal = getByLabelText('Codigo Postal *')

//   //     fireEvent.change(inputDireccion, { target: { value: '' } });
//   //     fireEvent.change(inputCiudad, { target: { value: 'Yerba Buena' } });
//   //     fireEvent.change(inputProvincia, { target: { value: "Tucumán" } });
//   //     fireEvent.change(inputCodigoPostal, { target: { value: "4107" } });
//   //     fireEvent.click(botonSiguiente2)

//   //     getByText('La Dirección es requerida.')
//   //   })
//   // });
//   // it('Happy path second step', async () => {
//   //   const { getByLabelText, getByRole  } = render(<Checkout />);

//   //   const botonSiguiente = getByRole("button", { name: /siguiente/i })
//   //   const inputDireccion = getByLabelText('Dirección *')
//   //   const inputCiudad = getByLabelText ('Ciudad *')
//   //   const inputProvincia =  getByLabelText ('Provincia *')
//   //   const inputCodigoPostal =  getByLabelText ('CodigoPostal *')

//   //   fireEvent.change(inputDireccion, { target: { value: '' } });
//   //   fireEvent.change(inputCiudad, { target: { value: 'Yerba Buena' } });
//   //   fireEvent.change(inputProvincia, { target: { value: "Tucumán" } });
//   //   fireEvent.change(inputCodigoPostal, { target: { value: "4107" } });
//   //   fireEvent.click(botonSiguiente)

//   //   await waitFor(() => 
//   //   getByLabelText('Nombre en la Tarjeta *'))
//   // });

//   // it("Happy Path", async () => {
//   //   const botonSiguiente = screen.getByRole('button', {
//   //     name: /Siguiente/i
//   //   })
//   //   const inputName = screen.getByRole('textbox', {
//   //     name: /nombre/i
//   //   }) as HTMLInputElement
//   //   const inputSurname = screen.getByRole('textbox', {
//   //     name: /apellido/i
//   //   }) as HTMLInputElement
//   //   const inputEmail = screen.getByRole('textbox', {
//   //     name: /correo electrónico/i
//   //   }) as HTMLInputElement

//   //   fireEvent.change(inputName, { target: { value: "Benjamín" } });
//   //   fireEvent.change(inputSurname, { target: { value: "Mirra" } });
//   //   fireEvent.change(inputEmail, { target: { value: "mirrabenjamin@gmail.com" } });
//   //   fireEvent.click(botonSiguiente)

//   //   await waitFor(() => {
//   //     screen.getByText("Código Postal")
//   //   });
//   // });
// });