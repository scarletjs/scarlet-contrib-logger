var formatter = require("./extensions/formatter");
var ConsoleAppender = require("./console-appender");

var LogInterceptor = module.exports = exports = function(appender){
	var self = this;

	if(!appender)
		appender = new ConsoleAppender();

	self.appender = appender;
	return self;
};

LogInterceptor.prototype.intercept = function(proceed,invocation){
	var self = this;

	try{

		self.debug("calling - "+invocation.objectName+"::"+invocation.methodName+"("+formatter.formatArgs(invocation.args)+")");
		
		var startTime = new Date();
		proceed();
		var endTime = new Date();

		self.debug(invocation.objectName+"::"+invocation.methodName+"("+formatter.formatArgs(invocation.args)+") - returned:"+JSON.stringify(invocation.result)+" - execution time("+formatter.getFormatedTimeSpan(startTime,endTime)+")");
		
		return invocation.result;
	}
	catch(exception){
		self.error(exception);
		throw exception;
	}
};

LogInterceptor.prototype.error = function(exception){
	var self = this;
	var message = exception.message+"\n"+exception.stack;
	self.appender.append(self.format(new Date(),message,"Error"));
};

LogInterceptor.prototype.debug = function(message){
	var self = this;
	self.appender.append(self.format(new Date(),message,"Debug"));
};

LogInterceptor.prototype.info = function(message){
	var self = this;
	self.appender.append(self.format(new Date(),message,"Info"));
};

LogInterceptor.prototype.format = function(time,message,logType){
	return "["+time+"] - "+logType+" - "+message;
};