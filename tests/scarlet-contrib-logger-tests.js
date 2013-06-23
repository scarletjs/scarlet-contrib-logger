var should = require('should');
var ScarletLogger = require("../index");

var TestAppender = function(){ 
	this.didAppend = false; 
};
TestAppender.prototype.append = function(message){
	this.didAppend = true; 
	this.message = message;
};

describe('Given using a Aspect Logger',function(){
	describe('When creating logging aspect for an object literal',function(){
		it("should return method results without modification",function(onComplete){
			var scarletLogger = new ScarletLogger();

			var objectToLog = {
				logMe : function(){
					onComplete()
				}
			}
			var testAppender = new TestAppender();
			objectToLog = scarletLogger.appender(testAppender).bindTo(objectToLog);
			objectToLog.logMe();
    	});
	});
	describe('When creating logging aspect',function(){
		it("should return method results without modification",function(onComplete){
			var scarletLogger = new ScarletLogger();

			var ObjectToLog = function (){};
			ObjectToLog.prototype.someMethod = function(){return 1;};

			var testAppender = new TestAppender();
			ObjectToLog = scarletLogger.appender(testAppender).bindTo(ObjectToLog);

			var objectToLog = new ObjectToLog();
			var result = objectToLog.someMethod();
			result.should.be.eql(1);
			onComplete();
		});
	});
	describe('When binding a logger',function(){
		it("should log",function(onComplete){
			var scarletLogger = new ScarletLogger();

			var ObjectToLog = function (){};
			ObjectToLog.prototype.someMethod = function(){return 1;};

			var testAppender = new TestAppender();
			ObjectToLog = scarletLogger.appender(testAppender).bindTo(ObjectToLog);

			var objectToLog = new ObjectToLog();
			objectToLog.someMethod();
			testAppender.didAppend.should.be.eql(true);
			onComplete();
		});
	});

});