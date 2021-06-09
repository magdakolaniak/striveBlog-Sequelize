import express from 'express';
import cors from 'cors';
import db from './db/index.js';
import authorsRoute from './services/authors/index.js';
import blogPostRoute from './services/blogPosts/index.js';
import listEndpoints from 'express-list-endpoints';

const server = express();

server.use(cors());
server.use(express.json());
server.use('/authors', authorsRoute);
server.use('/blogPosts', blogPostRoute);

const port = process.env.PORT || 3000;
console.table(listEndpoints(server));
db.sequelize
  .sync({ force: false })
  .then(() => {
    server.listen(port, () => console.log('Server is running on port:', port));
    server.on('error', (error) => console.info('Server is not running', error));
  })
  .catch((error) => {
    console.log(error);
  });
