import express from 'express';
import * as tweetController from '../controller/tweet.js';

const router = express.Router();

// GET /tweets  /tweets?username=:username
router.get('/', tweetController.getTweets);

// GET /tweets/:id
router.get('/:id', tweetController.getTweet);

router.post('/', tweetController.createTweet);

router.put('/:id', tweetController.updateTweet);

router.delete('/:id', tweetController.deleteTweet);

export default router;
