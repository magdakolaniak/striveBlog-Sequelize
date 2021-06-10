import s from 'sequelize';
import blogPostsModel from './blogPosts.js';
import AuthorModel from './authors.js';
import CommentModel from './comments.js';
import CategoryModel from './categories.js';
import ActivityModel from './activity.js';
const Sequelize = s.Sequelize;
const DataTypes = s.DataTypes;
const { PGUSER, PGDATABASE, PGPASSWORD, PGHOST } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  dialect: 'postgres',
});

const test = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection is working!');
  } catch (error) {
    console.log('Unable to connect', error);
  }
};

const models = {
  Author: AuthorModel(sequelize, DataTypes),
  BlogPost: blogPostsModel(sequelize, DataTypes),
  Comment: CommentModel(sequelize, DataTypes),
  Category: CategoryModel(sequelize, DataTypes),
  Activity: ActivityModel(sequelize, DataTypes),
  sequelize: sequelize,
};

models.Author.hasMany(models.BlogPost);
models.BlogPost.belongsTo(models.Author);

models.Category.hasMany(models.BlogPost);
models.BlogPost.belongsTo(models.Category);

//
// models.BlogPost.belongsToMany(models.Comment, {
//   through: { model: models.Activity, unique: false },
// });
// models.Comment.belongsToMany(models.BlogPost, {
//   through: { model: models.Activity, unique: false },
// });
models.Comment.hasMany(models.BlogPost);
models.BlogPost.belongsTo(models.Comment);

models.Author.hasMany(models.Comment);
models.Comment.belongsTo(models.Author);

test();
export default models;
