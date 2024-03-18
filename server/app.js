import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);

// 올바르지 않은 url 요청 처리
app.use((req, res, next) => {
  res.sendStatus(404);
});

// 서버 에러처리
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
