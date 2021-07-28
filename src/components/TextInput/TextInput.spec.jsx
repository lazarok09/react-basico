import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TextInput } from "./index.jsx";

describe("<TextInput />", () => {
  it("should have a value on placeholder", () => {
    // cria função mock pro textInput
    const fn = jest.fn();

    render(<TextInput handleChange={fn} searchValue={"test"} />);

    // capitura o input pelo placeholder dele
    const input = screen.getByPlaceholderText(/type your search/i);
    // garante que o input está no documento
    expect(input).toBeInTheDocument();
    // confere o texto enviado via searchValue
    expect(input.value).toBe("test");
  });

  it("should call handleChange on each key is pressed", () => {
    // cria função mock pro textInput
    const fn = jest.fn();

    render(<TextInput handleChange={fn} />);
    // capitura o input
    const input = screen.getByPlaceholderText(/type your search/i);
    const typedValue = "the value to input";
    // digitar algo no input (valor acima)
    userEvent.type(input, typedValue);
    // verifica se o valor do input é o digitado acima via userEvent
    expect(input.value).toBe(typedValue);
    /*
    @ Vamos verificar agora se a função mock foi acionada a cada key pressionada
   */
    expect(fn).toHaveBeenCalledTimes(typedValue.length);
  });
  it("should match snapshot", () => {
    // cria função mock pro textInput
    const fn = jest.fn();
    // capitura o container pra fazer match snapshot
    const { container } = render(<TextInput handleChange={fn} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
