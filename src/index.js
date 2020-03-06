import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { render } from 'react-dom';
import reducers from './redux/reducers/reducers';
import rootSaga from './redux/sagas/rootSaga';
import SnackbarProvider from './hoc/SnackBar/SnackbarProvider';


import './index.css';
import App from './App';


const sagaMiddleware = createSagaMiddleware();

/** Create middlewares for redux */
let middlewares = applyMiddleware(sagaMiddleware);

/** Create redux store */
const store = createStore(
    reducers,
    compose(middlewares,
        window.devToolsExtension ? window.devToolsExtension() : f => f),
);

sagaMiddleware.run(rootSaga);

render(
    <Provider store={store}>
        <BrowserRouter>
            <SnackbarProvider SnackbarProps={{ autoHideDuration: 2500 }}>
                <App />
            </SnackbarProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);