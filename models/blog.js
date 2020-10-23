'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Blog.belongsTo(models.Admin)
    }
  };
  Blog.init({
    username: DataTypes.STRING,
    topic: DataTypes.TEXT,
    article: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};