import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (mongoose.connection.readyState === 1) {
    // 1 means connected
    console.log("✅ MongoDB already connected");
    return;
  }

  if (mongoose.connection.readyState === 2) {
    // 2 means connecting
    console.log("⏳ MongoDB connection in progress...");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "propertypulse", // ensure correct DB
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    throw err;
  }
};

export default connectDB;
