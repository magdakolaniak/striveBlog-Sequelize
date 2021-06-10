export default (sequelize, DataTypes) => {
  const Activity = sequelize.define('activity', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  });
  return Activity;
};
