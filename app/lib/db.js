import { MongoClient } from "mongodb";

// Define connection details with proper URI naming
const connections = {
  admin: {
    uri: process.env.MONGODB_ADMIN_URI,
    dbName: "users",
  },
  authentication: {
    uri: process.env.MONGODB_AUTHENTICATION_URI,
    dbName: "admin-signup-access",
  },
  student: {
    uri:
      process.env.MONGODB_STUDENT_PROFILE_URI ||
      process.env.MONGODB_STUDENT_URI,
    dbName: "student-profile",
  },
  assignments: {
    uri: process.env.MONGODB_ASSIGNMENTS_URI || process.env.MONGODB_STUDENT_URI,
    dbName: "assignments",
  },
  grades: {
    uri: process.env.MONGODB_GRADES_URI || process.env.MONGODB_STUDENT_URI,
    dbName: "grades",
  },
};

const clients = {
  admin: null,
  authentication: null,
  student: null,
  assignments: null,
  grades: null,
};

const clientPromises = {
  admin: null,
  authentication: null,
  student: null,
  assignments: null,
  grades: null,
};

export async function connectToDB(type = "student") {
  if (!connections[type]) {
    throw new Error(`Invalid database type: ${type}`);
  }

  try {
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
  } catch (error) {
    console.error(`Error connecting to MongoDB (${type}):`, error);
    throw new Error(`Failed to connect to MongoDB (${type})`);
  }
}
