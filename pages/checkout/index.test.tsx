import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Checkout from "./index.page"


describe("App", () => {
  beforeEach(() => {
    render(<Checkout />);
  });

  it("should render the basic fields", () => {
    expect(screen.getByRole("textbox", { name: /nombre/i })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /apellido/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /correo electrónico/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /siguiente/i })
    ).toBeInTheDocument();
  });
  it("Happy Path", async () => {
    const botonSiguiente = screen.getByRole('button', {
      name: /Siguiente/i
    })
    const inputName = screen.getByRole('textbox', {
      name: /nombre/i
    }) as HTMLInputElement
    const inputSurname = screen.getByRole('textbox', {
      name: /apellido/i
    }) as HTMLInputElement
    const inputEmail = screen.getByRole('textbox', {
      name: /correo electrónico/i
    }) as HTMLInputElement

    fireEvent.change(inputName, { target: { value: "Benjamín" } });
    fireEvent.change(inputSurname, { target: { value: "Mirra" } });
    fireEvent.change(inputEmail, { target: { value: "mirrabenjamin@gmail.com" } });
    fireEvent.click(botonSiguiente)

    await waitFor(() => {
      screen.getByText("Código Postal")
    });
  });
});