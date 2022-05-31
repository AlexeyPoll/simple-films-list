import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import isEqual from 'lodash.isequal'

import App from './components/App';
import store from './store'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

store.subscribe(() => {
  const registratedAccounts = store.getState().users.registratedAccounts;
  const currentAccount = store.getState().users.currentAccount;

  const storedAccounts = localStorage.getItem('registratedAccounts');
  const storedCurrentAccount = localStorage.getItem('currentAccount');

  if (!storedAccounts || !isEqual(registratedAccounts, storedAccounts)) {
    localStorage.setItem('registratedAccounts', JSON.stringify(registratedAccounts))
  }

  if (!storedCurrentAccount || !isEqual(currentAccount, storedCurrentAccount)) {
    localStorage.setItem('currentAccount', JSON.stringify(currentAccount))
  }
})

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
