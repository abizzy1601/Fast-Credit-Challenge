require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://construction:construction@cluster0.pidvk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useFindAndModify: false
}, err => { 
    if (!err) {
        console.log('DB connection successful')
    } else {
        console.log('Error connecting to DB' + err)
    } 
});