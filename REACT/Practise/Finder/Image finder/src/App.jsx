import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          <Navbar />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
