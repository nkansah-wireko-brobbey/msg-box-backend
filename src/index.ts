import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

import { colors } from './utils/constants/colors';
import { connectToMongoDB } from './db/config/dbconfig';


import routes from './routes';

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.use(cors());

app.use(morgan('combined'))

app.use('/',routes());

const server = createServer(app);

connectToMongoDB();

server.listen(PORT, () => {
  console.log(colors.magenta,`Server running on port ${PORT}`)
  console.log(colors.reset);

});
