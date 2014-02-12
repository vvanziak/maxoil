
/**
 * Module dependencies.
 */
require( './initDB' );

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
