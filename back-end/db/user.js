const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    hash_password:{
        type:String,
        require:true
    }
})

const User = mongoose.model("User",Userschema);

module.exports = User;