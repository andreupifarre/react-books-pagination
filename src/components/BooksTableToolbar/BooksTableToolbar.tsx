import React, { Component } from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Tooltip from "@material-ui/core/Tooltip";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = (theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: "1 1 100%",
  },
  input: {
    marginRight: theme.spacing(1),
  },
});

type BooksTableToolbarProps = {
  classes: ClassNameMap;
  rowCount: number;
  onSearch: Function;
  search: string;
};

type BooksTableToolbarState = {
  inputValue: string;
};

class BooksTableToolbar extends Component<
  BooksTableToolbarProps,
  BooksTableToolbarState
> {
  state: BooksTableToolbarState = {
    inputValue: "",
  };

  componentDidMount() {
    this.setState({
      inputValue: this.props.search,
    });
  }

  handleChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      this.props.onSearch(this.state.inputValue);
    }
  };

  render() {
    const { classes, rowCount } = this.props;

    return (
      <Toolbar className={classes.root}>
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Books ({rowCount})
        </Typography>
        <Tooltip title="Filter list">
          <>
            <InputBase
              className={classes.input}
              placeholder="Search..."
              inputProps={{ style: { textAlign: "right" } }}
              onChange={this.handleChangeInputValue}
              onKeyDown={this.handleKeyDown}
              value={this.state.inputValue}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
              onClick={(e) => this.props.onSearch(this.state.inputValue)}
            >
              <SearchIcon />
            </IconButton>
          </>
        </Tooltip>
      </Toolbar>
    );
  }
}

export default withStyles(useStyles)(BooksTableToolbar);
