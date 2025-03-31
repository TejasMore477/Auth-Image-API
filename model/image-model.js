const mongoose = require('mongoose');


const imageSchema = new mongoose.Schema({
    url : {
        required : true,
        type: String,
        unique : true
    },
    publicId : {
        type : String,
        required : true
    },
    uploadedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
}, {timestamps : true});