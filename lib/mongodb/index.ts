import mongoose from "mongoose";

const MONGO_URL = process.env.MONGODB_URL;

if (!MONGO_URL) {
  throw new Error("MONGODB_URL is not defined in environment variables.");
}

const dbConnection = async (): Promise<void> => {
  const { readyState } = mongoose.connection || {};
  const { connected } = mongoose.STATES || {};

  if (readyState === connected) {
    console.info("✅ Already connected to Datebase.");
    return;
  }

  try {
    await mongoose.connect(MONGO_URL);
    console.info("✅ Connected to Datebase.");
  } catch (error) {
    console.error("❌ Datebase connection error:", error);
    throw new Error("Datebase connection failed.");
  }
};

export default dbConnection;
