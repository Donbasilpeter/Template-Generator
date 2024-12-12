import mongoose from 'mongoose';

// Create user schema
const userSessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
});

// Create User model
const UserSession = mongoose.model('UserSession', userSessionSchema);

export default UserSession;
