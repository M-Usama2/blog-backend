import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database Connected Successfully`);
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};
