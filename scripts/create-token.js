// This is a utility script to generate and store a new admin access token
// Run with: node create-token.js

const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

// MongoDB connection string - use the same as in your .env file
const MONGODB_AUTHENTICATION_URI =
  "mongodb+srv://admin-signup-access:hueiT6lC0EvhsUUT@cluster0.eg0br.mongodb.net/admin-signup-access?retryWrites=true&w=majority";

async function createToken() {
  // Generate a random token (12 characters)
  const token = crypto.randomBytes(6).toString("hex");

  // Hash the token with bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedToken = await bcrypt.hash(token, salt);

  // Connect to MongoDB
  const client = new MongoClient(MONGODB_AUTHENTICATION_URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("admin-signup-access");
    const collection = db.collection("admin-tokens");

    // Deactivate all existing tokens
    await collection.updateMany({ active: true }, { $set: { active: false } });

    // Store the new hashed token
    await collection.insertOne({
      hashedToken: hashedToken,
      active: true,
      createdAt: new Date(),
    });

    console.log("New admin access token created:");
    console.log("----------------------------------------");
    console.log(token); // This is the plaintext token to share with admins
    console.log("----------------------------------------");
    console.log("Store this token securely. It will not be displayed again.");
  } catch (error) {
    console.error("Error creating token:", error);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

createToken().catch(console.error);
