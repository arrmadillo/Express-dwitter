import * as tweetRepository from '../data/tweet.js';

export async function getTweets(req, res) {
  const username = req.query.username;
  //   username 유무에 따라 data값 넘김
  const data = await (username
    ? tweetRepository.getAllByUsername(username)
    : tweetRepository.getAll());
  res.json(data);
}

export async function getTweet(req, res) {
  const id = req.params.id;
  const tweet = await tweetRepository.getById(id);
  if (tweet) {
    res.json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

export async function createTweet(req, res, next) {
  const { text } = req.body;
  const tweet = await tweetRepository.create(text, req.userId);
  res.status(201).json(tweet);
}

export async function updateTweet(req, res) {
  const id = req.params.id;
  const userId = req.userId;
  console.log('유저아이디: ', userId);

  const tweet = await tweetRepository.getById(id);
  console.log('트윗아이디: ', tweet.userId);
  const text = req.body.text;
  if (!tweet) {
    res.sendStatus(404);
  }
  // 본인 작성유무
  if (tweet.userId !== userId) {
    res.sendStatus(403); // 403은 로그인된 사용자지만 권한이 없을떄
  }

  const updated = await tweetRepository.update(id, text);
  res.status(200).json(updated);
}

export async function deleteTweet(req, res) {
  const id = req.params.id;
  const userId = req.userId;
  const tweet = await tweetRepository.getById(id);
  if (!tweet) {
    res.sendStatus(404);
  }
  // 본인 작성유무
  if (tweet.userId !== userId) {
    res.sendStatus(403); // 403은 로그인된 사용자지만 권한이 없을떄
  }
  await tweetRepository.remove(id);
  res.sendStatus(204);
}
