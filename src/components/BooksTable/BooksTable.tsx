import React from "react";
import { useSelector } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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

const BooksTable = () => {
  const books = useSelector((state: { books: DataInterface[] }) => state.books);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
            size="small"
          >
            <TableBody>
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
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default BooksTable;
