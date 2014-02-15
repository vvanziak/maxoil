var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var User = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

var UserModel = mongoose.model('User', User);

module.exports.UserModel = UserModel;