import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configureStore from "./redux/store/configureStore";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "react-toastify/dist/ReactToastify.css";
import "./i18n"

//const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore();

ReactDOM.render(
        <Provider store={store}>
            <Suspense fallback={<div>Loading...</div>}/>
            <Router>
                <App/>
            </Router>
        </Provider>,
    document.getElementById('root')
);
