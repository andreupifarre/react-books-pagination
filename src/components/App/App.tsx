import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "@material-ui/core";
import BooksTable from "../BooksTable/BooksTable";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Container maxWidth="md">
          <BooksTable />
        </Container>
      </div>
    </Router>
  );
}

export default App;
