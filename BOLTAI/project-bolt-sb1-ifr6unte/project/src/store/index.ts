import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import serverReducer from './slices/serverSlice';
import channelReducer from './slices/channelSlice';
import messageReducer from './slices/messageSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    servers: serverReducer,
    channels: channelReducer,
    messages: messageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;