import DataInterface from "../components/DataInterface";

export const FETCH_BOOKS_BEGIN = "FETCH_BOOKS_BEGIN";
export const FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS";
export const FETCH_BOOKS_FAILURE = "FETCH_BOOKS_FAILURE";

export const fetchBooksBegin = () => ({
  type: FETCH_BOOKS_BEGIN,
});

export const fetchBooksSuccess = (books: DataInterface[], count: number) => ({
  type: FETCH_BOOKS_SUCCESS,
  books,
  count,
});

export const fetchBooksFailure = (error: string) => ({
  type: FETCH_BOOKS_FAILURE,
  error,
});
