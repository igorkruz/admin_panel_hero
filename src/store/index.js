import { configureStore } from '@reduxjs/toolkit';

import filters from '../reducers/filters';
import heroes from '../reducers/heroes';

const customMiddleware = () => (next) => (action) => {
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

export default store;

