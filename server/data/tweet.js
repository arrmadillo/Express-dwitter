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

export function getAll() {
  return tweets;
}

export function getAllByUsername(username) {
  return tweets.filter((tweet) => tweet.username === username);
}

export function getById(id) {
  return tweets.find((tweet) => tweet.id === id);
}

export function create(text, name, username) {
  // 새로운 트윗 생성
  const newTweet = {
    id: (tweets.length + 1).toString(),
    text,
    createdAt: Date.now().toString(),
    name,
    username,
    url: 'https://example.com',
  };
  tweets = [newTweet, ...tweets];
  return newTweet;
}

export function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  // 트윗이 없다면 undefined
  return tweet;
}

export function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id); // 삭제할 id만 삭제후 재할당
}
