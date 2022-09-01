import { configureStore } from '@reduxjs/toolkit';

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

const store = configureStore({
    reducer: { heroes, filters },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(customMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
})
// const store = createStore(
//     combineReducers({ heroes, filters }),
//     compose(applyMiddleware(ReduxThunk, customMiddleware),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// );


// compose with enhancer and DevTools
// compose(
//     enhancer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// ));


// function enhancer
// const enhancer = (createStore) => (...args) => {
    //     const store = createStore(...args);
    
    //     const oldDispatch = store.dispatch;
    
    //     store.dispatch = (actions) => {
    //         if (typeof actions === 'string') {
    //             return oldDispatch({
    //                 type: actions
    //             })
    //         }
    //         return oldDispatch(actions)
    //     }
    //     return store;
    // }
    

export default store;

