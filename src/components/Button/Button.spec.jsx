import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './index.jsx';

describe('<Button />', () => {
  it("should render the button with the text 'Mais posts'", () => {
    const fn = jest.fn();
    // renderiza o botão e passa pra ele o texto mais posts através de props
    render(<Button onClick={fn} text="Mais posts" disabled={false} />);

    expect.assertions(1);
    // capitura o botão renderizado pra ter certeza de que ele tem o texto é adicionado duas regras
    // a primeira que o elemento botão html tenha sido criado
    // a segunda que o nome mais posts seja o nome do botão
    // as barras com um i é uma "expressão regular" que garante a inclusão de letras minúsculas
    const button = screen.getByRole('button', { name: /mais posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should call a function on button click', () => {
    const fn = jest.fn();
    // renderiza o botão e passa pra ele o texto mais posts através de props
    render(<Button onClick={fn} text="Mais posts" disabled={false} />);

    const button = screen.getByRole('button', { name: /mais posts/i });
    userEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when prop disabled is true', () => {
    const fn = jest.fn();
    // renderiza o botão e passa pra ele o texto mais posts através de props
    render(<Button onClick={fn} text="Mais posts" disabled={true} />);

    const button = screen.getByRole('button', { name: /mais posts/i });

    expect(button).toBeDisabled();
  });

  it('should be enabled when prop disabled is false', () => {
    const fn = jest.fn();
    // renderiza o botão e passa pra ele o texto mais posts através de props
    render(<Button onClick={fn} text="Mais posts" disabled={false} />);

    const button = screen.getByRole('button', { name: /mais posts/i });

    expect(button).toBeEnabled();
  });
  it('should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<Button text="mais posts" disabled={false} onClick={fn} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
