import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

import filters from '../reducers/filters';
import heroes from '../reducers/heroes';
                // ({dispatch, getState})
const customMiddleware = () => (next) => (action) => {
                                // (dispatch)
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
}

const enhancer = (createStore) => (...args) => {
    const store = createStore(...args);

    const oldDispatch = store.dispatch;

    store.dispatch = (actions) => {
        if (typeof actions === 'string') {
            return oldDispatch({
                type: actions
            })
        }
        return oldDispatch(actions)
    }
    return store;
}

const store = createStore(
    combineReducers({ heroes, filters }),
    compose(applyMiddleware(customMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);
// compose(
//     enhancer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// ));

export default store;

