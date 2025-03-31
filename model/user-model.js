const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName : {
        required : [true, "user name is require"],
        type : String,
        maxLength: [100, "Username cannot be more than 100 characters long"],
        trim : true
    },
    email : {
        required : [true, 'email is required'],
        unique : true,
        type : String,
        lowercase : true,
        trim : true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    password : {
        required : [true, "password is required"],
        type: String,
        trim : true
    },
    role : {
        type : String,
        enum : ["user","admin"],
        default : "user"
    }
},
{timestamps: true});

module.exports = mongoose.model('User', UserSchema);