import { MongoClient, Db } from 'mongodb';

let dbconnection: Db | undefined;
const uri: string =
  'mongodb+srv://dulanmihimansa:test123@cluster0.koobcgz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  

export const connectToDb = (callback: (error?: Error | null) => void) => {
    MongoClient.connect(uri)
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