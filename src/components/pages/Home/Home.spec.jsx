import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import Home from '.';
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (request, response, context) => {
    return response(
      context.json([
        {
          userId: 1,
          id: 1,
          title: 'title 1',
          body: 'body1',
          url: 'img/img.png',
        },
        {
          userId: 2,
          id: 2,
          title: 'title 2',
          body: 'body2',
          url: 'img/img2.png',
        },
        {
          userId: 3,
          id: 3,
          title: 'title 3',
          body: 'body3',
          url: 'img/img3.png',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('should search for posts', async () => {
    render(<Home />);
    const noPostCard = screen.getByText('Opa, parece que não encontramos um post com este título :(');
    await waitForElementToBeRemoved(noPostCard);
    // verifica se passaram 11 testes
    expect.assertions(11);
    // capitura o placeholder do input e verifica se ele existe no documento
    const search = screen.getByPlaceholderText('Type your search');
    expect(search).toBeInTheDocument();
    // pega o valor usado no mock acima e vê se está no documento.
    expect(screen.getByRole('heading', { name: 'title 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title 2' })).toBeInTheDocument();
    /* lembrando que temos apenas 2 elementos em tela independente do mock ter 3 dados */
    expect(screen.queryByRole('heading', { name: 'title 3' })).not.toBeInTheDocument();

    userEvent.type(search, 'title 1');
    expect(screen.getByRole('heading', { name: 'title 1' })).toBeInTheDocument();

    expect(screen.queryByRole('heading', { name: 'title 2' })).not.toBeInTheDocument();
    /* lembrando que temos apenas 2 elementos em tela independente do mock ter 3 dados */
    expect(screen.queryByRole('heading', { name: 'title 3' })).not.toBeInTheDocument();

    // verifica se o test escrito com o userEvent está na tela ao lado de Search :
    expect(screen.getByRole('heading', { name: /Search : title 1/ })).toBeInTheDocument();

    // limpar na tela e verificar se os posts title1 e title2 está renderizado
    userEvent.clear(search);
    expect(screen.getByRole('heading', { name: 'title 1' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'title 2' })).toBeInTheDocument();
    // renderiza o texto do noPostsCard na Home

    userEvent.type(search, 'TheBeatles');
    expect(screen.getByText('Opa, parece que não encontramos um post com este título :(')).toBeInTheDocument();
  });

  it('should load more posts when the button got click', async () => {
    render(<Home />);
    const noPostCard = screen.getByText('Opa, parece que não encontramos um post com este título :(');
    await waitForElementToBeRemoved(noPostCard);

    const button = screen.getByRole('button', { name: /mais posts/i });
    expect(button).toBeInTheDocument();

    // o comportamento normal é que quando o botão existe na primeira vez tenhamos apenas dois posts
    expect(screen.queryByRole('heading', { name: 'title 3' })).not.toBeInTheDocument();
    // agora quando eu clicar
    userEvent.click(button);
    expect(screen.queryByRole('heading', { name: 'title 3' })).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
