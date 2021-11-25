import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from "react-cookie"
import 'bootstrap/dist/css/bootstrap.min.css'
import {createStore} from 'redux'
import rootReducer from "./redux/reducers/index.js"
import {composeWithDevTools} from "redux-devtools-extension"
import {Provider} from "react-redux"

const store=createStore(rootReducer,composeWithDevTools())
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <Provider store={store}>
        <App />
        </Provider>
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

