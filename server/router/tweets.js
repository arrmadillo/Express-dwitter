import express from 'express';
import { body } from 'express-validator';
// 로컬
import * as tweetController from '../controller/tweet.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateTweet = [
  body('text').trim().isLength({ min: 2 }).withMessage('3글자 이상 작성!'),
  validate,
];

// GET /tweets  /tweets?username=:username
router.get('/', tweetController.getTweets);

// GET /tweets/:id
router.get('/:id', tweetController.getTweet);

router.post('/', validateTweet, tweetController.createTweet);

router.put('/:id', validateTweet, tweetController.updateTweet);

router.delete('/:id', tweetController.deleteTweet);

export default router;
