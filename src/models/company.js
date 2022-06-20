'use strict';

const companyModel = (sequelize, DataTypes) => sequelize.define('company', {
  companyName: { type: DataTypes.STRING,  required: true },
  catchPhrase: { type: DataTypes.STRING,  required: true },
  companyPlace: { type: DataTypes.STRING,  required: true}
});

module.exports= companyModel;