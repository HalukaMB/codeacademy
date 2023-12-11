import mongoose from 'mongoose';
const { Schema } = mongoose;

const locationSchema = new Schema({
  lat: {
    type: Number,
    required: true,
    unique: false,
  },
  locationname: {
    type: String,
    required: true,
    unique: false,
  },
  long: {
    type: Number,
    required: true,
    unique: false,
  },
  category: {
    type: String,
    required: true,
    unique: false,
  },
  likes:{
    type:Number,
    required:true,
    unique:false
  }
  }
);
const Location = mongoose.model("Location", locationSchema);
export default Location;