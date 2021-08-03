import {
  FETCH_BOOKS_BEGIN,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
} from "./actions";

type actionPropsType = {
  books: object[];
  error: string;
  type: string;
  count: number;
};

type initialStateType = {
  books: object[];
  error: string;
};

const initialState = {
  books: [],
  error: "",
};

const booksReducer = (
  state: initialStateType = initialState,
  action: actionPropsType
) => {
  switch (action.type) {
    case FETCH_BOOKS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        count: action.count,
        books: action.books,
      };
    case FETCH_BOOKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default booksReducer;
