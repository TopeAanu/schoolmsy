// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'student'],
    default: 'student',
  },
  grade: {
    type: String,
    required: function() { return this.role === 'student'; },
  },
  subjects: {
    type: [String],
    required: function() { return this.role === 'student'; },
  },
  age: {
    type: Number,
    required: function() { return this.role === 'student'; },
  },
  image: {
    type: String,
    default: '',
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);