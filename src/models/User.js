import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, 'Username Already Exists!'],
      lowercase: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
