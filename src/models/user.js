import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      min: 6,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    role: {
      type: String,
      required: false,
      default: 'normaluser'
    }
  },
  {
    collection: 'User'
  }
);

const User = mongoose.model('User', UserSchema);

export default User;
