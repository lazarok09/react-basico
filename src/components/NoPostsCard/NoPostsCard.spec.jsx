import { render, screen } from "@testing-library/react";

import { NoPostsCard } from "./index.jsx";

describe("<NoPostsCard />", () => {
  it("should render the text properly", () => {
    render(<NoPostsCard />);
    expect(
      screen.getByText(/Opa, parece que não encontramos /i)
    ).toBeInTheDocument();
  });
});
