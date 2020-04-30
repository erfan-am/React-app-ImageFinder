import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import { createStore, applyMiddleware, compose ,combineReducers} from 'redux';
import {BrowserRouter} from 'react-router-dom'
import thunk from 'redux-thunk';
import AUTH from './store/reducer/auth'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const root=combineReducers({
    auth:AUTH
})
const store=createStore(root, composeEnhancers(
    applyMiddleware(thunk)
))

const app=(
    <BrowserRouter><App /></BrowserRouter>
)

ReactDOM.render(<Provider store={store}>{app}</Provider>,document.getElementById('root'));
