const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    companyname: {
        type: String,
    },
    
    email: {
        type: String,
        // required: true,
    },
    phone: {
        type: Number,
    },
    gender: {
        type: String,
    },
    DOB: {
        type: String,
    },
    nationality: {
        type: String,
    },
    password: {
        type: String,
    }, 
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Users', UsersSchema)