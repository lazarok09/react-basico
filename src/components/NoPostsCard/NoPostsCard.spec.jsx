import { render, screen } from "@testing-library/react";

import { NoPostsCard } from "./index.jsx";

describe("<NoPostsCard />", () => {
  it("should render the text properly", () => {
    render(<NoPostsCard />);
    // testa se o texto confere com o renderizado
    expect(
      screen.getByText(/Opa, parece que não encontramos /i)
    ).toBeInTheDocument();
  });
});
