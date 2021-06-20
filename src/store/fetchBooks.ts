import { Dispatch } from "redux";
import {
  fetchBooksBegin,
  fetchBooksSuccess,
  fetchBooksFailure,
} from "./actions";

export const fetchBooks = (
  page: number,
  itemsPerPage: number,
  search: string = ""
) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchBooksBegin());
    try {
      // Take baseURL out to a config file
      const response = await fetch("http://nyx.vima.ekt.gr:3000/api/books", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page,
          itemsPerPage,
          filters: [{ type: "all", values: [search] }],
        }),
      });
      const res = handleErrors(response);
      const json = await res.json();
      dispatch(fetchBooksSuccess(json.books, json.count));
      return json.books;
    } catch (error) {
      return dispatch(fetchBooksFailure(error));
    }
  };
};

// Handle HTTP errors since fetch won't.
const handleErrors = (response: Response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};
