import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import DataInterface from "../DataInterface";

interface HeadCell {
  id: keyof DataInterface;
  label: string;
}

const headCells: HeadCell[] = [
  { id: "id", label: "ID" },
  { id: "book_title", label: "Title" },
  { id: "book_author", label: "Author(s)" },
  { id: "book_pages", label: "Pages" },
  { id: "book_publication_city", label: "Publication City" },
  { id: "book_publication_country", label: "Publication Country" },
  { id: "book_publication_year", label: "Publication Year" },
];

const BooksTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id}>{headCell.label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default BooksTableHead;
