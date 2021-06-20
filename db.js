require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://fastCredit:fastCredit@cluster0.m9x31.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useFindAndModify: false
}, err => { 
    if (!err) {
        console.log('DB connection successful')
    } else {
        console.log('Error connecting to DB' + err)
    } 
});