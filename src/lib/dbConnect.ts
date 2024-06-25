import mongoose from "mongoose";
import { connection } from "mongoose";
import { env } from "process";

type ConnectionObject = {
  isConnected?: boolean;
};

const connections: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connections.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    connections.isConnected = db.connections[0].readyState === 1; // 1 means connected, 0 means disconnected
    console.log("DB connected Successfully");
  } catch (error) {
    console.error("DB connection failed", error);
    process.exit(1);
  }
}

export default dbConnect;
