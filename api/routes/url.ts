import express from "express";
import ShortUrl from "../models/url";
import type {Url} from "../types";

const getRandomId = () => {
  let result = '';
  const words = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
  const max_position = words.length - 1;
  for (let i = 0; i < 7; i++) {
    const position = Math.floor(Math.random() * max_position);
    result = result + words.substring(position, position + 1);
  }
  return result;
};

const urlRouter = express.Router();

urlRouter.post('/links', async (req, res) => {
  try {
    const shortUrlId = getRandomId();
    const currentShortUrl = await ShortUrl.findOne({shortUrl: shortUrlId});

    if (!currentShortUrl) {
      const newUrl: Url = {
        shortUrl: shortUrlId,
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
      const newUrl: Url = {
        shortUrl: getRandomId(),
        originalUrl: req.body.originalUrl,
      };
      const currentUrl = new ShortUrl(newUrl);
      try {
        await currentUrl.save();
        return res.send(currentUrl);
      } catch (error) {
        return res.status(400).send(error);
      }
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
