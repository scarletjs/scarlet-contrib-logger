var LogInterceptor = require("./log-interceptor.js");

var ScarletLogger = module.exports = exports = function(scarlet){
	var self = this;

	self.scarlet = scarlet;
	self.logInterceptor = new LogInterceptor();
};

self.initialize = function() {
	var self = this;
	assert(self.scarlet, "Scarlet-Contrib-Logger::ScarletLogger::$scarlet == null");
	self.scarlet.plugins.logger = self;
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

	self.scarlet
		.interceptObject(objectToLog)
		.using(self.logInterceptor,self.logInterceptor.intercept);
};

ScarletLogger.prototype.unBind = function(){
	self.scarlet.release();
};

ScarletLogger.prototype.info = function(message){this.logInterceptor.info(message);};
ScarletLogger.prototype.debug = function(message){this.logInterceptor.debug(message);};
ScarletLogger.prototype.error = function(message){this.logInterceptor.error(message);};