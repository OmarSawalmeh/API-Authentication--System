"use strict";
require('dotenv').config();

//Connects to our database depending on the URI as an environmental variable
const { Sequelize, DataTypes } = require("sequelize");
const companyModel = require('./company');
const employeeModel  = require('./employee');
const userModel=require('./users');
const Collection =require('./data-collection');

const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
let sequelizeOptions =
    process.env.NODE_ENV === "production"
        ? {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl :{require: true,
                    rejectUnauthorized: false},
                native: true
            }
        } : {};


// we are going to use this to connect to Postgres
let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);


const companyTable = companyModel(sequelize, DataTypes);
const employeeTable = employeeModel (sequelize, DataTypes);

const companyCollection = new Collection(companyTable);
const employeeCollection = new Collection(employeeTable);

companyTable.hasMany(employeeTable, {
    foreignKey: "companyId",
    sourceKey: "id"
});

employeeTable.belongsTo(companyTable, {
    foreignKey: "companyId",
    targetKey: "id",
});

module.exports = {
    sequelize: sequelize,
    DataTypes:DataTypes,
    company:companyCollection,
    employee:employeeCollection,
    Users:userModel(sequelize, DataTypes)
};
