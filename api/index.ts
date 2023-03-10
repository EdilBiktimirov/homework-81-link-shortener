import cors from "cors";
import express from "express";
import * as mongoose from "mongoose";
import urlRouter from "./routes/url";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/', urlRouter);

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect('mongodb://localhost/url');

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);

