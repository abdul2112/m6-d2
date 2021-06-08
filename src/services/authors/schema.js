import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const authorSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    avatar: {
      type: String,
      required: true,
      default: 'https://ui-avatars.com/api/?name=Unnamed+User',
    },
  },
  { timestamps: true }
);

export default model('Author', authorSchema);
