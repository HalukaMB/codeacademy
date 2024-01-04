import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  reportedplaces:{
    type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'location' }],
    required:false,
    unique:false
  },
  cleanedplaces:{
    type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'location' }],
    required:false,
    unique:false
  }
  }
);
const userModel = mongoose.model("User", userSchema);
export default userModel;