import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import appoloClient from "./appoloClient";
import { CookiesProvider } from "react-cookie";
import { createStore } from "./redux";
import {
  MuiThemeProvider as MuiThemeProvider2,
  createMuiTheme
} from "@material-ui/core/styles";

const theme2 = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const store = createStore({});

ReactDOM.hydrate(
  <MuiThemeProvider2 theme={theme2}>
    <CookiesProvider>
      <ApolloProvider client={appoloClient()}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApolloProvider>
    </CookiesProvider>
  </MuiThemeProvider2>,
  document.getElementById("root")
);
