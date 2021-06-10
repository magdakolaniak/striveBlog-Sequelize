import { Router } from 'express';
import models from '../../db/index.js';

const Comment = models.Comment;

const commentRoute = Router();

commentRoute.get('/', async (req, res, next) => {
  try {
    const data = await Comment.findAll();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
commentRoute.get('/:id', async (req, res, next) => {
  try {
    const data = await Comment.findByPk(req.params.id);
    res.send(data);
  } catch (error) {}
});
commentRoute.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    const data = await Comment.create(req.body);

    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
commentRoute.put('/:id', async (req, res, next) => {
  try {
    const data = await Comment.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.send(data[1][0]);
  } catch (error) {
    console.log(error);
  }
});
// commentRoute.delete('/:id', async (req, res, next) => {
//   try {
//     const row = await Comment.destroy({
//       where: { id: req.params.id },
//     });
//     if (row > 0) {
//       res.send('Succesfully deleted');
//     } else {
//       res.status(404).send('Author with given ID not found');
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

export default commentRoute;
