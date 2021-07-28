const { render, screen } = require("@testing-library/react");
import { Home } from "./index.jsx";

describe("<Home />", () => {
  it("should search : to be in the document", () => {
    render(<Home />);
    expect(
      screen.getByRole("searchbox", { name: "Search :" })
    ).toBeInTheDocument();
  });

  it("renders Home", () => {
    render(<Home />);
    const linkElement = screen.getByText(/Search :/i);
    expect(linkElement).toBeInTheDocument();
  });
});
