import {UrlApi} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {addShortUrl} from "./shortUrlThunks";
import {RootState} from "../../app/store";

interface InitialState {
  item: UrlApi | null;
  loading: boolean;
  error: boolean;
}

const initialState: InitialState = {
  item: null,
  loading: false,
  error: false,
}

const shortUrlSlice = createSlice({
  name: 'shortUrl',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addShortUrl.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(addShortUrl.fulfilled, (state, action) => {
      state.item = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(addShortUrl.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  }
})

export const shortUrlReducer = shortUrlSlice.reducer;

export const selectUrl = (state: RootState) => state.shortUrl.item;
export const selectLoading = (state: RootState) => state.shortUrl.loading;