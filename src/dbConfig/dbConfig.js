import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URL;

let isConnected = false;

export const connect = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw new Error('MongoDB connection error');
  }
};
