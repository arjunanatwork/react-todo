import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faInbox, faCalendarCheck, faCalendarAlt, faPlus, faSignOutAlt, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from './App';
import store from "./redux/store";

import * as serviceWorker from './serviceWorker';

import './index.css';


WebFont.load({
    google: {
        families: ['IBM Plex Sans:400,500,700', 'sans-serif']
    }
});

library.add(faInbox, faCalendarCheck, faCalendarAlt, faPlus, faSignOutAlt, faEdit, faTrash);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, document.getElementById('root'));

serviceWorker.register();
