
/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require( 'mongoose' );
var log4js = require('log4js');
var nconf = require('nconf');
var app = express();

//Config manager
nconf.file({file: path.join(__dirname, 'config/app.json')});
var config = nconf;
//-------------

// all environments
app.set('port', config.get('port') || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Logger
log4js.configure('config/log4js.json', { reloadSecs: 300 });
var appLogger = log4js.getLogger('App');
var dbLogger = log4js.getLogger('Mongo');
//---------------

mongoose.connect( config.get('db:connection') +'/'+ config.get('db:name') , function(){
    var attachMongoose = function(req, res, next) {
        req.mongoose = mongoose;
        next();
    };
    var attachLogger = function(req, res, next) {
        req.log4js = log4js;
        next();
    };

    app.get('/', attachMongoose, attachLogger, routes.index);

    //Models
    var UserModel = require('./models/user').UserModel;

    app.get('/user', function(req, res) {
        console.log('read');
        return UserModel.find(function (err, users) {
            console.log(0);
            if (!err) {
                console.log(1);
                return res.send({ status: 'OK', users:users });
            } else {
                console.log(2);
                res.statusCode = 500;
                return res.send({ error: 'Server error' });
            }
        });
    });

    app.post('/user', function(req, res) {

        var user = new UserModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });

        user.save(function (err) {
            if (!err) {
                return res.send({ status: 'OK', user:user });
            } else {
                return res.send({ error: 'Server error' });
            }
        });
    });

    app.get('/user/:id', function(req, res) {
        return UserModel.findById(req.params.id, function (err, user) {
            if(!user) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            if (!err) {
                return res.send({ status: 'OK', user:user });
            } else {
                res.statusCode = 500;
                return res.send({ error: 'Server error' });
            }
        });
    });

    app.put('/user/:id', function (req, res){
        return UserModel.findById(req.params.id, function (err, user) {
            if(!user) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }

            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;

            return user.save(function (err) {
                if (!err) {
                    return res.send({ status: 'OK', user:user });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
            });
        });
    });

    app.delete('/user/:id', function (req, res){
        return UserModel.findById(req.params.id, function (err, user) {
            if(!user) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            return user.remove(function (err) {
                if (!err) {
                    return res.send({ status: 'OK' });
                } else {
                    res.statusCode = 500;
                    return res.send({ error: 'Server error' });
                }
            });
        });
    });

    http.createServer(app).listen(config.get('port'), function(){
        appLogger.info('Express server listening on port ' + config.get('port'));
    });
});

// CONNECTION EVENTS
// TODO: Move it somewhere

mongoose.connection.on('connected', function () {
    dbLogger.debug('Mongoose connected');
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    dbLogger.error('Mongoose connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    dbLogger.warn('Mongoose connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        dbLogger.debug('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
//---------------
