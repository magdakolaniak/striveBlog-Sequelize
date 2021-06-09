import { Router } from 'express';
import models from '../../db/index.js';

const Author = models.Author;

const authorsRoute = Router();

authorsRoute.get('/', async (req, res, next) => {
  try {
    const data = await Author.findAll();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
authorsRoute.get('/:id', async (req, res, next) => {
  try {
    if (id) {
      const data = await Author.findByPk(req.params.id);

      res.send(data);
    } else {
      console.log('ID not found');
    }
  } catch (error) {
    console.log(data);
  }
});
authorsRoute.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    const data = await Author.create(req.body);
    console.log(req.body);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
authorsRoute.put('/:id', async (req, res, next) => {
  try {
    const data = await Author.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.send(data[1][0]);
  } catch (error) {
    console.log(error);
  }
});
authorsRoute.delete('/:id', async (req, res, next) => {
  try {
    const row = await Author.destroy({
      where: { id: req.params.id },
    });
    if (row > 0) {
      res.send('Succesfully deleted');
    } else {
      res.status(404).send('Author with given ID not found');
    }
  } catch (error) {
    console.log(error);
  }
});

export default authorsRoute;
