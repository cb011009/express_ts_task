"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.connectToDb = void 0;
const mongodb_1 = require("mongodb");
let dbconnection;
const uri = 'mongodb+srv://dulanmihimansa:test123@cluster0.koobcgz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const connectToDb = (callback) => {
    mongodb_1.MongoClient.connect(uri)
        .then((client) => {
        dbconnection = client.db();
        callback();
    })
        .catch((err) => {
        console.log(err);
        callback(err);
    });
};
exports.connectToDb = connectToDb;
const getDb = () => {
    if (!dbconnection) {
        throw new Error('Database connection not established');
    }
    return dbconnection;
};
exports.getDb = getDb;
