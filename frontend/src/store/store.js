import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/authSlice'
import notificationReducer from './features/notificationSlice'

export const store = configureStore({
  reducer: {
    user: userReducer, 
    notification:notificationReducer, 
  },
});
