import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import {receiveTea, receiveTeas, removeTea, fetchTeaDetail } from './store/teaReducer';
import { Provider } from 'react-redux';
import { requestTeas, postTea } from './utils/tea_api_utils';
import { fetchAllTeas} from './store/teaReducer';
import { restoreSession } from './store/csrf';
import { loginUser, logoutUser, createUser } from './store/usersReducer';


const initializeApp = () => {

let initialState = {}
let currentUser = JSON.parse(sessionStorage.getItem('currentUser'))

if (currentUser) {
  initialState = {
  users: {[currentUser.id]: currentUser}
  };
}

const store = configureStore(initialState);

// testing
window.store = store;
window.receiveTea = receiveTea;
window.receiveTeas = receiveTeas;
window.removeTea = removeTea;
window.requestTeas = requestTeas;
window.postTea = postTea;
window.fetchAllTeas = fetchAllTeas;
window.fetchTeaDetail = fetchTeaDetail;
window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.createUser = createUser;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
}

restoreSession().then(initializeApp)
