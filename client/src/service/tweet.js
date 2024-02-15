export default class TweetService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  async getTweets(username) {
    // 유저네임(쿼리여부)
    const query = username ? `?username=${username}` : '';
    const response = await fetch(`${this.baseURL}/tweets${query}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    // 200이 아닌경우
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }

  async postTweet(text) {
    const response = await fetch(`${this.baseURL}/tweets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, username: 'ellie', name: 'ellie' }),
    });
    const data = await response.json();
    // 201이 아닌경우
    if (response.status !== 201) {
      throw new Error(data.message);
    }
    return data;
  }

  async deleteTweet(tweetId) {
    // 유저네임(쿼리여부)
    const response = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    // 204이 아닌경우
    if (response.status !== 204) {
      throw new Error();
    }
  }

  async updateTweet(tweetId, text) {
    const response = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    // 200이 아닌경우
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }
}
