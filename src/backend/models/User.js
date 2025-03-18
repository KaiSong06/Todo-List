import mongoose from "mongoose";

//User schema
const User = mongoose.model("User", new mongoose.Schema({
    email: {type:String, unique:true},
    password: {type:String},
}))

export default User