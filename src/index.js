import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { Provider } from "react-redux";
import { reducer } from "./redux/reducer.ts";
import { createStore } from "redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore(reducer)}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
