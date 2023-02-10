import { configureStore } from '@reduxjs/toolkit';
import {shortUrlReducer} from "../features/shortUrl/shortUrlSlice";

export const store = configureStore({
  reducer: {
    shortUrl: shortUrlReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;