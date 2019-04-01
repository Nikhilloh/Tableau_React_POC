import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import Test from './Tableau Components/Tableau-react';
import * as serviceWorker from './serviceWorker';
//import TableauReport from './TableauReport';

ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(<TableauReport />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();