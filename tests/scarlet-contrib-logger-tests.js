var should = require('should');
var ScarletLogger = require("../lib/scarlet-contrib-logger");

var ObjectLiteral = require("./dummies/object-literal");
var NamedFunction = require("./dummies/named-function");
var UnnamedFunction = require("./dummies/unnamed-function");
var PrototypeFunction = require("./dummies/prototype-function");

describe('Given using a Scarlet Logger',function(){

	var didAppend = false;
	var appendMessage = "";

	var TestAppender = function(){};
	TestAppender.prototype.append = function(message){
		didAppend = true; 
		appendMessage = message;
	};

	beforeEach(function() {
		didAppend = false;
		appendMessage = "";
	});

	describe('When logging a Prototype function',function(){
		var scarletLogger = new ScarletLogger();
		var testAppender = new TestAppender();
		var LogPrototypeFunction = scarletLogger.appender(testAppender)
												.bindTo(PrototypeFunction);

		it("should return method results without modification",function(){
						
			var loggedInstance = new LogPrototypeFunction();
			var result = loggedInstance.methodWithReturn();
			result.should.be.eql("any");
		});
		it("should append to the logger",function(){
			var loggedInstance = new LogPrototypeFunction();
			var result = loggedInstance.methodWithReturn();
			didAppend.should.be.eql(true);
		});
	});

	describe('When logging a object literal',function(){
		var scarletLogger = new ScarletLogger();
		var testAppender = new TestAppender();
		var LogObjectLiteral = Object.create(ObjectLiteral);
		scarletLogger.appender(testAppender).bindTo(LogObjectLiteral);

		it("should return method results without modification",function(){
						
			var result = LogObjectLiteral.methodWithReturn();
			result.should.be.eql("any");
		});
		it("should append to the logger",function(){
						
			var result = LogObjectLiteral.methodWithReturn();
			didAppend.should.be.eql(true);
		});
	});

	describe('When logging a named function',function(){
		var scarletLogger = new ScarletLogger();
		var testAppender = new TestAppender();
		var LogNamedFunction = scarletLogger.appender(testAppender)
												.bindTo(NamedFunction);

		it("should return method results without modification",function(){
			var loggedInstance = new LogNamedFunction();
			var result = loggedInstance.methodWithReturn();
			result.should.be.eql("any");
		});

		it("should append to the logger",function(){
			var loggedInstance = new LogNamedFunction();
			var result = loggedInstance.methodWithReturn();
			didAppend.should.be.eql(true);
		});
	});

	describe('When logging a named function',function(){
		var scarletLogger = new ScarletLogger();
		var testAppender = new TestAppender();
		var LogUnnamedFunction = scarletLogger.appender(testAppender)
												.bindTo(UnnamedFunction);

		it("should return method results without modification",function(){
			var loggedInstance = new LogUnnamedFunction();
			var result = loggedInstance.methodWithReturn();
			result.should.be.eql("any");
		});
		
		it("should append to the logger",function(){
			var loggedInstance = new LogUnnamedFunction();
			var result = loggedInstance.methodWithReturn();
			didAppend.should.be.eql(true);
		});
	});

});