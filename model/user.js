const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    lname:{
        type:String
    },
    name:{
        type:String
    },
    address:{
        type: String
    },
    state: {
        type:String
    },
    birthday: {
        type:String
    },

    height: {
        type: String
    },
    eyecolor: {
        type:String
    },
    weight: {
        type:String
    },
    sex: {
        type:String
    },
})


const User = mongoose.model('User', userSchema)

module.exports =User