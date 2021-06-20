import { render, screen } from "@testing-library/react";
import BooksTableToolbar from "./BooksTableToolbar";

test("renders books 0", () => {
  render(<BooksTableToolbar rowCount={2} onSearch={() => {}} search="" />);

  const booksCount = screen.getByText(/Books \(2\)/i);
  expect(booksCount).toBeInTheDocument();
});

test("renders search value", () => {
  const { container } = render(
    <BooksTableToolbar rowCount={0} onSearch={() => {}} search="hello" />
  );

  const searchValue = container
    .getElementsByClassName("MuiInputBase-input")[0]
    .getAttribute("value");

  expect(searchValue).toBe("hello");
});

// More tests...
