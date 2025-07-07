import { render, screen, fireEvent } from "@/test-utils/render";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  it("renders search input with correct placeholder", () => {
    render(<SearchBar />);
    expect(
      screen.getByPlaceholderText("Enter city or coordinates lat, lon")
    ).toBeInTheDocument();
  });

  it("updates query on typing", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      "Enter city or coordinates lat, lon"
    );
    fireEvent.change(input, { target: { value: "London" } });
    expect(input).toHaveValue("London");
  });
});
