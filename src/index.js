import React from "react";
import ReactDOM from "react-dom";
import './css/style.css';
import { Provider } from 'react-redux';
//import { createStore, /*applyMiddleware*/ } from 'redux';
//import reduxThunk from 'redux-thunk';
import App from './App';
import store from "./store";
//import reducers from './reducers';

/*const store = createStore(
   reducers,
   applyMiddleware(reduxThunk)
);*/

ReactDOM.render(

      <Provider store={store}>
         <App />,
      </Provider>,

   document.getElementById('root')
);