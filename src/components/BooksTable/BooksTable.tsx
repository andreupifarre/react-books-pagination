import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

import { fetchBooks } from "../../store/fetchBooks";

import BooksTableHead from "../BooksTableHead/BooksTableHead";
import BooksTableToolbar from "../BooksTableToolbar/BooksTableToolbar";

import DataInterface from "../DataInterface";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    loader: {
      textAlign: "center",
    },
    noBooks: {
      fontStyle: "italic",
    },
  })
);

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const BooksTable = () => {
  const query = useQuery();
  const pageParam = parseInt(query.get("pageParam")!) || 0;
  const rowsPerPageParam = parseInt(query.get("rowsPerPageParam")!) || 10;
  const searchParam = query.get("searchParam") || "";
  const history = useHistory();
  const dispatch = useDispatch();
  const books = useSelector((state: { books: DataInterface[] }) => state.books);
  const booksCount =
    useSelector((state: { count: number }) => state.count) || 0;
  const isLoading = useSelector((state: { loading: Boolean }) => state.loading);
  const classes = useStyles();
  const [page, setPage] = useState(pageParam);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageParam);
  const [search, setSearch] = useState(searchParam);

  const pageSelectionHistory = (
    page: number,
    rowsPerPage: number,
    search: string
  ) =>
    history.push(
      `/?pageParam=${page}&rowsPerPageParam=${rowsPerPage}&searchParam=${search}`
    );

  useEffect(() => {
    dispatch(fetchBooks(page + 1, rowsPerPage, search));
  }, [dispatch, page, rowsPerPage, search]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    pageSelectionHistory(newPage, rowsPerPage, search);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    pageSelectionHistory(0, newRowsPerPage, search);
  };

  const handleSearch = (inputValue: string) => {
    setSearch(inputValue);
    setPage(0);
    pageSelectionHistory(0, rowsPerPage, inputValue);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <BooksTableToolbar
          rowCount={booksCount}
          onSearch={handleSearch}
          search={search}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
            size="small"
          >
            <BooksTableHead />
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <div className={classes.loader}>
                      <CircularProgress />
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {books.map((row) => {
                    return (
                      <TableRow hover tabIndex={-1} key={row.id}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.book_title}</TableCell>
                        <TableCell>
                          {row.book_author.map((item) => item + " ")}
                        </TableCell>
                        <TableCell>{row.book_pages}</TableCell>
                        <TableCell>{row.book_publication_city}</TableCell>
                        <TableCell>{row.book_publication_country}</TableCell>
                        <TableCell>{row.book_publication_year}</TableCell>
                      </TableRow>
                    );
                  })}
                  {books.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className={classes.noBooks}>
                        No books available
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={booksCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default BooksTable;
