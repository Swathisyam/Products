const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ProductDb')

const Schema = mongoose.Schema 
const userSchema = new Schema({
    email: String,
    password: String
});

var userData = mongoose.model('user', userSchema);
module.exports = userData;