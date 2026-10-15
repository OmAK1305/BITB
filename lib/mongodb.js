import mongoose from "mongoose";
import dns from "dns";

// Fix Node.js querySrv ECONNREFUSED on local ISP / Wi-Fi DNS
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  // Ignore if custom dns servers cannot be set
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/beautyinthebeast";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log("[MongoDB] Successfully connected to database");
      return mongooseInstance;
    }).catch((err) => {
      cached.promise = null;
      console.warn("[MongoDB] Warning: Could not connect to MongoDB:", err.message);
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
