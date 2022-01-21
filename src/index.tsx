import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from 'App';
import reportWebVitals from 'reportWebVitals';
import store from 'stores/store';
import { ToastContainer } from 'react-toastify';
import 'assets/fonts/stylesheet.css';
import 'react-toastify/dist/ReactToastify.css';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 3000;
  return library;
}

ReactDOM.render(
  <Provider store={store}>
    <Web3ReactProvider getLibrary={getLibrary}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
          <ToastContainer pauseOnHover={false} newestOnTop={true} autoClose={3000} limit={1} />
        </React.StrictMode>
      </BrowserRouter>
    </Web3ReactProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
