import mongoose from "mongoose";

let connection;

export async function connectToDatabase() {
  if (connection) return connection;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI must be configured to use the API.");
  }

  connection = await mongoose.connect(uri);
  return connection;
}
