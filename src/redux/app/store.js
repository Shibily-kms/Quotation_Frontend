import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userAuthSlice from '../features/authSlice'
import quotationSlice from '../features/quotationSlice';


const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    // user
    userAuth: userAuthSlice,
    inputData: quotationSlice
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable check for redux-persist
        }),
})

export const persistor = persistStore(store);