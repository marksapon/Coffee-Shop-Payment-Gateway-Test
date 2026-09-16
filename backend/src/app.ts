import express, { type Express, type Request, type Response } from 'express';

const app: Express = express();
const axios = require('axios');

const port = process.env.PORT || 3210;

// Xendit Config
const XENDIT_READ_KEY = process.env.XENDIT_API_KEY;
const XENDIT_WRITE_KEY = process.env.XENDIT_API_KEY;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port);