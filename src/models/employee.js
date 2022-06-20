'use strict';

const employeeModel = (sequelize, DataTypes) => sequelize.define('employee', {
  name: { type: DataTypes.STRING,  required: true},
  experience: { type: DataTypes.INTEGER, required: true },
  department: { type: DataTypes.ENUM('QC', 'QA', 'Engineering'),  allowNull: false },
  companyId: {type: DataTypes.INTEGER, allowNull: false,}
});

module.exports = employeeModel;
