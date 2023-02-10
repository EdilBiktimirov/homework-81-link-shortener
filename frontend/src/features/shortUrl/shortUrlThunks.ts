import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import type {UrlApi, UrlMutation} from "../../types";

export const addShortUrl = createAsyncThunk<UrlApi, UrlMutation>(
  'shortUrl/addUrl',
  async (newUrl) => {
    const response = await axiosApi.post<UrlApi>('/links', newUrl);
    return response.data;
  }
);