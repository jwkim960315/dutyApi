import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserCreateForm from './components/UserCreateForm';
import Main from './components/Main';
import reducer from './reducers';
import Navbar from './components/Navbar'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TradeDutyDatesPage from "./components/TradeDutyDatesPage";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,{},composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route path="/home" component={App} />
                    <Route path="/createUser" component={UserCreateForm} />
                    <Route path="/trade" component={TradeDutyDatesPage} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

