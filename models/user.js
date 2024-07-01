const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userschema = new Schema ( {
    email: {type:String, required:true, unique:true}
})
userschema.plugin(passportLocalMongoose);
// this will itself add a field of {passowrd,username} in userschema
// it makes sure every ' username ' is unique   baaki sab yaha : https://github.com/saintedlama/passport-local-mongoose?tab=readme-ov-file#plugin-passport-local-mongoose
module.exports= mongoose.model('User', userschema);