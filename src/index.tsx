import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "theme-ui";
// @ts-ignore
import { base } from "@theme-ui/presets";
import { store } from "./core/store";
import { SearchContainer } from "./features/search/containers/SearchContainer";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider
        theme={{
          ...base,
          cards: {
            primary: {
              padding: 2,
              borderRadius: 4,
              boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
            },
            compact: {
              padding: 1,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "muted",
            },
          },
          styles: {
            ...base.styles,
            root: {
              ...base.styles.root,
              padding: 0,
              margin: 0,
              overflowY: 'scroll',
            }
          }
        }}
      >
        <SearchContainer />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
