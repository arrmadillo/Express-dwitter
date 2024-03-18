import express from 'express';
import { body } from 'express-validator';
// 로컬
import * as tweetController from '../controller/tweet.js';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

const validateTweet = [
  body('text').trim().isLength({ min: 2 }).withMessage('3글자 이상 작성!'),
  validate,
];

// GET /tweets  /tweets?username=:username
router.get('/', isAuth, tweetController.getTweets);

// GET /tweets/:id
router.get('/:id', isAuth, tweetController.getTweet);

router.post('/', isAuth, validateTweet, tweetController.createTweet);

router.put('/:id', isAuth, validateTweet, tweetController.updateTweet);

router.delete('/:id', isAuth, tweetController.deleteTweet);

export default router;
