var assert = require("assert");
var LogInterceptor = require("./log-interceptor.js");

var ScarletLogger = module.exports = exports = function(scarlet){
	var self = this;

	self.logInterceptor = new LogInterceptor();

	self.initialize = function(){

		scarlet.plugins.logger = self;
		return self;
	};

	self.interceptor = function(logInterceptor){
		
		assert(logInterceptor, "Scarlet-Contrib-Logger::interceptor === null");

		self.logInterceptor = logInterceptor;

		return self;
	};

	self.appender = function(appender){

		if(appender)
			self.logInterceptor.appender = appender;

		return self;
	};

	self.bindTo = function(objectToLog, memberToLog){
		
		assert(objectToLog, "Object to bind must be defined");

		var interceptor = null;
		if(memberToLog)
			interceptor = scarlet.intercept(objectToLog, memberToLog);
		else
			interceptor = scarlet.intercept(objectToLog);

		return interceptor.using(self.logInterceptor.intercept,self.logInterceptor)
						.resolve();
	};

	self.info = function(message){this.logInterceptor.info(message);};
	self.debug = function(message){this.logInterceptor.debug(message);};
	self.error = function(message){this.logInterceptor.error(message);};
};