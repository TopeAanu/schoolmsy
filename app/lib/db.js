// app/lib/db.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  ssl: true,
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true
  }
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectToDB() {
  try {
    const client = await clientPromise;
    const db = client.db('users');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}