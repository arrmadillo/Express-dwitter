import express from 'express';

let tweets = [
  //  API 테스트를 위한 임시 데이터
  {
    id: '1',
    text: '첫번째 트윗',
    createdAt: Date.now().toString(),
    name: 'Bob',
    username: 'bob',
    url: 'https://m.media-amazon.com/images/M/MV5BNzg0MWEyZjItOTZlMi00YmRjLWEyYzctODIwMDU0OThiMzNkXkEyXkFqcGdeQXVyNjUxMjc1OTM@._V1_.jpg',
  },
  {
    id: '2',
    text: '두번째 트윗',
    createdAt: Date.now().toString(),
    name: 'Anna',
    username: 'anna',
    url: 'https://static.wikia.nocookie.net/dis/images/7/7c/B5da8e4c0046a83b81dbd945719f6b354edd764b.jpeg/revision/latest?cb=20160623191458',
  },
];

const router = express.Router();

// GET /tweets  /tweets?username=:username
router.get('/', (req, res, next) => {
  const username = req.query.username;
  //   username 유무에 따라 data값 넘김
  const data = username
    ? tweets.filter((tweet) => tweet.username === username)
    : tweets;
  res.json(data);
});

// GET /tweets/:id
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    res.json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

router.post('/', (req, res) => {
  // 클라이언트로부터 전달된 데이터
  const { text, name, username } = req.body;

  // 데이터 유효성 검사
  if (!text || !name || !username) {
    return res.status(400).json({ error: '제목과 내용을 모두 입력해주세요.' });
  }

  // 새로운 트윗 생성
  const newTweet = {
    id: (tweets.length + 1).toString(),
    text,
    createdAt: Date.now().toString(),
    name,
    username,
    url: 'https://example.com',
  };
  tweets.push(newTweet);

  // 성공적인 응답
  return res.status(201).json(newTweet);
});

router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = tweets.find((tweet) => tweet.id === id); // 특정 트윗
  if (tweet) {
    tweet.text = text;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }

  res.sendStatus(204).json({ message: `Tweet id(${id}) not found` });
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  tweets = tweets.filter((tweet) => tweet.id !== id); // 삭제할 id만 삭제후 재할당
  res.sendStatus(204);
});

export default router;
