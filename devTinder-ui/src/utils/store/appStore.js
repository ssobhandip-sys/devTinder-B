import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice';
import feedReducer from './slices/feedSlice';
const appStore = configureStore({
  reducer: {
    user:userReducer,
    feed:feedReducer
  },
});

export default appStore;