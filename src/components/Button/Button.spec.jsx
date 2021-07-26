const { render, screen } = require("@testing-library/react");
import userEvent from "@testing-library/user-event";
import { Button } from "./index.jsx";

describe("<Button />", () => {
  it("should render the button with the text 'Mais posts'", () => {
    // renderiza o botão e passa pra ele o texto mais posts através de props
    render(<Button text="Mais posts" />);

    expect.assertions(1);
    // capitura o botão renderizado pra ter certeza de que ele tem o texto é adicionado duas regras
    // a primeira que o elemento botão html tenha sido criado
    // a segunda que o nome mais posts seja o nome do botão
    // as barras com um i é uma "expressão regular" que garante a inclusão de letras minúsculas
    const button = screen.getByRole("button", { name: /mais posts/i });
    expect(button).toBeInTheDocument();
  });

  it("should call a function on button click", () => {
    const fn = jest.fn();

    render(<Button text="mais posts" onClick={fn} />);

    const button = screen.getByRole("button", { name: /mais posts/i });
    userEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when prop disabled is true", () => {
    render(<Button text="mais posts" disabled={true} />);

    const button = screen.getByRole("button", { name: /mais posts/i });

    expect(button).toBeDisabled();
  });

  it("should be enabled when prop disabled is false", () => {
    render(<Button text="mais posts" disabled={false} />);

    const button = screen.getByRole("button", { name: /mais posts/i });

    expect(button).toBeEnabled();
  });
});
