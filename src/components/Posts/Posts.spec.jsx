import { render, screen } from "@testing-library/react";
import { Posts } from "./index.jsx";

const props = {
  posts: [
    {
      id: 1,
      title: "title example",
      cover: "img/img.png",
      body: "paragraph example",
    },
    {
      id: 2,
      title: "title example2",
      cover: "img/img2.png",
      body: "paragraph example2",
    },
    {
      id: 3,
      title: "title example3",
      cover: "img/img3.png",
      body: "paragraph example3",
    },
  ],
};

describe("<Posts />", () => {
  it("should render posts", () => {
    render(<Posts {...props} />);
    // verifica o nome dentro dos heading
    expect(
      screen.getAllByRole("heading", { name: /title example/i })
    ).toHaveLength(3);
    // verificar o alt text da imagem
    expect(screen.getAllByRole("img", { name: /title example/i })).toHaveLength(
      3
    );
    // verificar os textos
    expect(screen.getAllByText(/paragraph example/i)).toHaveLength(3);
    // verifica se uma imagem com o titulo x e o atributo de endereço src informado existe
    expect(screen.getByRole("img", { name: "title example" })).toHaveAttribute(
      "src",
      "img/img.png"
    );
  });
  // se não tiver props no post
  it("should not render posts if there's no props />", () => {
    render(<Posts />);

    expect(
      screen.queryByRole("heading", { name: /title example/ })
    ).not.toBeInTheDocument();
  });
  // snapshot
  it("should match snapshot", () => {
    const { container } = render(<Posts {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
