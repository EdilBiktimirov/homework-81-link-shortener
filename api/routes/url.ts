import express from "express";
import ShortUrl from "../models/url";
import type {Url} from "../types";

const urlRouter = express.Router();

urlRouter.post('/links', async (req, res) => {
  try {
    const currentShortUrl = await ShortUrl.findOne({shortUrl: req.body.shortUrl});

    if (!currentShortUrl) {
      const newUrl: Url = {
        shortUrl: req.body.shortUrl,
        originalUrl: req.body.originalUrl,
      };

      const currentUrl = new ShortUrl(newUrl);
      try {
        await currentUrl.save();
        return res.send(currentUrl);
      } catch (error) {
        return res.status(400).send(error);
      }
    } else {
      return res.send({message: 'Incorrectly generated short url'})
    }
  } catch (e) {
    return res.sendStatus(500);
  }
});

urlRouter.get('/:shortUrl', async (req, res) => {
  try {
    const result = await ShortUrl.findOne({shortUrl: req.params.shortUrl});

    if (!result) {
      return res.sendStatus(404);
    }
    res.status(301).redirect(result.originalUrl);
  } catch (e) {
    return res.sendStatus(500);
  }
});

export default urlRouter;
