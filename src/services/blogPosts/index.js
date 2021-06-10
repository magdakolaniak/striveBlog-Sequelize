import { Router } from 'express';
import models from '../../db/index.js';

const BlogPost = models.BlogPost;
const Author = models.Author;
const Category = models.Category;
const Comment = models.Comment;

const blogPostRoute = Router();

blogPostRoute.get('/', async (req, res, next) => {
  try {
    const data = await BlogPost.findAll({
      include: [
        {
          model: Author,
          attributes: ['id', 'name', 'surname'],
        },
        {
          model: Category,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [
            {
              model: Author,
              attributes: ['name', 'surname'],
              exclude: ['authorId', 'id'],
            },
          ],

          attributes: ['comment', 'rate', 'authorId'],
        },
      ],
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt',
          'authorId',
          'categoryId',
          'commentId',
        ],
      },
    });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
blogPostRoute.get('/:id', async (req, res, next) => {
  try {
    const data = await BlogPost.findByPk(req.params.id);
    res.send(data);
  } catch (error) {
    console.log(data);
  }
});
blogPostRoute.post('/', async (req, res, next) => {
  try {
    const data = await BlogPost.create(req.body);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
blogPostRoute.post('/category', async (req, res, next) => {
  try {
    const data = await Category.create(req.body);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
// blogPostRoute.post('/:id/comment', async (req, res, next) => {
//   try {
//     const data = await Comment.create(req.body);
//     const commentId = data.id;

//     const updatePost = await BlogPost.update(req.body.commentId, {
//       where: { id: req.params.id },
//       returning: true,
//     });
//     res.send(updatePost);
//   } catch (error) {
//     console.log(error);
//   }
// });
blogPostRoute.put('/:id', async (req, res, next) => {
  try {
    const data = await BlogPost.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.send(data[1][0]);
  } catch (error) {
    console.log(error);
  }
});
blogPostRoute.delete('/:id', async (req, res, next) => {
  try {
    const row = await BlogPost.destroy({
      where: { id: req.params.id },
    });
    if (row > 0) {
      res.send('Succesfully deleted');
    } else {
      res.status(404).send('Blog with given ID not found');
    }
  } catch (error) {
    console.log(error);
  }
});

export default blogPostRoute;
