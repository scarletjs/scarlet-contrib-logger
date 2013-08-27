var assert = require("assert");
var Scarlet = require("scarlet");
var LogInterceptor = require("./log-interceptor.js");

var scarlet = new Scarlet();

var ScarletLogger = module.exports = exports = function(logInterceptor){
	var self = this;
	if(!logInterceptor)
		logInterceptor =  new LogInterceptor();

	self.logInterceptor = logInterceptor;
};

ScarletLogger.prototype.interceptor = function(logInterceptor){
	var self = this;
	
	assert(logInterceptor, "Scarlet-Contrib-Logger::interceptor === null");

	self.logInterceptor = logInterceptor;

	return self;
};

ScarletLogger.prototype.appender = function(appender){
	var self = this;

	if(appender)
		self.logInterceptor.appender = appender;

	return self;
};

ScarletLogger.prototype.bindTo = function(objectToLog){
	var self = this;

	if(!objectToLog)
		throw new Error("Object to bind must be defined");

	return scarlet.intercept(objectToLog)
					.using(self.logInterceptor.intercept,self.logInterceptor)
					.resolve();
};

ScarletLogger.prototype.info = function(message){this.logInterceptor.info(message);};
ScarletLogger.prototype.debug = function(message){this.logInterceptor.debug(message);};
ScarletLogger.prototype.error = function(message){this.logInterceptor.error(message);};