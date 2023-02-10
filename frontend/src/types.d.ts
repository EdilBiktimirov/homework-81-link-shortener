export interface UrlApi {
  _id: string;
  shortUrl: string;
  originalUrl: string;
}

export type UrlMutation = Omit<UrlApi, '_id'>