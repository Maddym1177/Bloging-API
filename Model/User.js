const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    address:String,
    mobileNo:Number,
    email: String,
    createdBy:String,
    createdAt :{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('alluser', userSchema);