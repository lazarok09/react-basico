import { render, screen } from '@testing-library/react';
import { PostCard } from '.';
import { postCardMockProps } from './mock';
// cria dados falsos
const props = postCardMockProps;

describe('<PostCard />', () => {
  it('should render PostCard correctly', () => {
    render(<PostCard {...props} />);
    expect(screen.getByAltText('title example')).toHaveAttribute('src', 'img/img.png');
    expect(screen.getByRole('heading', { name: 'title example' })).toBeInTheDocument();

    expect(screen.getByText('paragrafo')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<PostCard {...props} />);
    expect(container.firstChild).toMatchSnapshot();
    // primeiro filho do elemento é o elemento que estou renderizando
  });
});
