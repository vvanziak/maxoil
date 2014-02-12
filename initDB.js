var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var User = new Schema({
    id : String,
    login: String,
    password: String,
    name : String
});

mongoose.model( 'User', User );
mongoose.connect( 'mongodb://localhost/main' );