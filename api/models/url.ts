import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  shortUrl: {
    type: String,
    required: true
  },
  originalUrl: {
    type: String,
    required: true
  }
});

const ShortUrl = mongoose.model('Url', UrlSchema);
export default ShortUrl;