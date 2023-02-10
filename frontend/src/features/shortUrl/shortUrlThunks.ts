import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import type {UrlApi, UrlMutation} from "../../types";

export const addShortUrl = createAsyncThunk<UrlApi, UrlMutation>(
  'shortUrl/addUrl',
  async (newUrl) => {
    const response = await axiosApi.post<UrlApi>('/links', newUrl);
    console.log(response);
    return response.data;
  }
);

// export const getShortUrl = createAsyncThunk<UrlApi, string>(
//   'shortUrl/getShortUrl',
//   async (shortUrl) => {
//     const response = await axiosApi.get('/links/' + shortUrl);
//     return response.data;
//   }
// )