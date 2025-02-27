import { MongoClient } from "mongodb";

const connections = {
  admin: {
    uri: process.env.MONGODB_ADMIN_URI,
    dbName: "users",
  },
  student: {
    uri: process.env.MONGODB_STUDENT_URI,
    dbName: "student-profile",
  },
  student: {
    uri: process.env.MONGODB_STUDENT_URI,
    dbName: "assignments",
  },
  student: {
    uri: process.env.MONGODB_STUDENT_URI,
    dbName: "grades",
  },
};

const clients = {
  admin: null,
  student: null,
};

const clientPromises = {
  admin: null,
  student: null,
};

export async function connectToDB(type = "student") {
  if (!connections[type]) throw new Error("Invalid database type");

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromises) global._mongoClientPromises = {};
    if (!global._mongoClientPromises[type]) {
      clients[type] = new MongoClient(connections[type].uri);
      global._mongoClientPromises[type] = clients[type].connect();
    }
    clientPromises[type] = global._mongoClientPromises[type];
  } else {
    if (!clientPromises[type]) {
      clients[type] = new MongoClient(connections[type].uri);
      clientPromises[type] = clients[type].connect();
    }
  }

  const client = await clientPromises[type];
  return client.db(connections[type].dbName);
}
