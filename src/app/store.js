import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { 
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import cartReducer from './features/cartSlice';
import authReducer from './features/authSlice';
import { apiSlice } from './features/api/apiSlice';

// Persist config for cart
const persistConfig = {
  key: 'kupperCommerce',
  storage,
  whitelist: ['cart', 'auth'] // only persist cartItems
};

  // Combine reducers
  const rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer
    });
      
    // Create a persisted reducer
    const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);