import { type ClassValue, clsx } from "clsx";
import mongoose from "mongoose";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const connectDB = async () => {
  try {
    if (mongoose.connections && mongoose.connections[0].readyState) return;
    const { connection } = await mongoose.connect(
      process.env.MONGO_URI as string
    );

    console.log(`Connected to ${connection}`);
  } catch (error: any) {
    console.log(error);
  }
};
