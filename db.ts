import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let dbconnection: Db | undefined;
const uri: string  =
process.env.MONGODB_URI || ''
  

export const connectToDb = (callback: (error?: Error | null) => void) => {
    MongoClient.connect(uri )
      .then((client) => {
        dbconnection = client.db();
        callback();
      })
      .catch((err) => {
        console.log(err);
        callback(err);
      });
};

export const getDb = (): Db => {
    if (!dbconnection) {
      throw new Error('Database connection not established');
    }
    return dbconnection;
};