export interface UrlApi {
  _id: string;
  shortUrl: string;
  originalUrl: string;
}

export interface UrlMutation {
  originalUrl: string;
}