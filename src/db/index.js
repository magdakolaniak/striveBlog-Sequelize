import s from 'sequelize';
import pg from 'pg';

const Sequelize = s.Sequelize;
const DataTypes = s.DataTypes;
import blogPostsModel from './blogPosts.js';
import AuthorModel from './authors.js';

const { PGUSER, PGDATABASE, PGPASSWORD, PGHOST } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  dialect: 'postgres',
});
const pool = new pg.Pool();

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
  sequelize: sequelize,
  pool: pool,
};

models.Author.hasMany(models.BlogPost);
models.BlogPost.belongsTo(models.Author);
test();
export default models;
