import mongoose from "mongoose";

//
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cached = (global as any) || { conn: null, promise: null };

export const connectToDb = async (MONGODB_URI = process.env.DATABASE_URI) => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    throw new Error(
      "Please define the DATABASE_URI environment variable inside .env.local"
    );
  }

  if (!cached.promise) {
    mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;

  return cached.conn;
};
