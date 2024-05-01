import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    select: false,
  },
  googleId: {
    type: String,
  },
});

export const User = mongoose.models.User || mongoose.model("User", schema);
