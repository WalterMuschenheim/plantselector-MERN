import Main from "./components/MainComponent";
import ScrollToTop from "./components/ScrollToTopComponent";
import "./App.scss";
import React, { Component } from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <ScrollToTop />
        <div className="App">
          <Main />
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
