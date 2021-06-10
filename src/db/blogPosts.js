const blogPostsModel = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('blogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    read_time_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    read_time_unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  return blogPost;
};
export default blogPostsModel;
