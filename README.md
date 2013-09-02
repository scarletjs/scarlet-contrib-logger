scarlet-contrib-logger
======================

> Scarlet plugin for a simple logger

[![Build Status](https://travis-ci.org/scarletjs/scarlet-contrib-logger.png?branch=master)](https://travis-ci.org/scarletjs/scarlet-contrib-logger)

##Install

  `npm install scarlet-contrib-logger`

##Start logging

 ```javascript
var Scarlet = require('scarlet');
var scarlet = new Scarlet('../lib/scarlet-contrib-logger');
var scarletLogger = scarlet.plugins.logger;

//Attach Logger to object
scarletLogger.bindTo(Math,'min');

//Now use intercepted object with logging!
Math.min(1,2,3);
//->[Mon Sep 02 2013 01:07:05 GMT+0100 (BST)] - Debug - calling - Object::min(1,2,3)
//->[Mon Sep 02 2013 01:07:05 GMT+0100 (BST)] - Debug - Object::min(1,2,3) - returned:1 - execution time(0:0:0.0)
```

## Getting Started
This plugin requires Scarlet `~0.5.x`

If you haven't used [Scarlet](https://github.com/scarletjs/scarlet) before, be sure to check out the [Documentation](https://github.com/scarletjs/scarlet).  To use this plugin perform the following:

Install scarlet
```shell
npm install scarlet --save
```

Install plugin
```shell
npm install scarlet-contrib-logger --save
```

Once the plugin has been installed, you can use it in your application as follows:

```js
//load scarlet
var Scarlet = require('scarlet');

//Initialize scarlet with the plugin
var scarlet = new Scarlet('scarlet-contrib-logger');
var scarletLogger = scarlet.plugins.logger;
```


## Project Purpose

This project uses [Scarlet](https://github.com/scarletjs/scarlet) to show how logging and interception can be easily integrated into your project.  

Instead of having to write code that mixes in logging and application logic like this:
```javascript
function FunctionToLog(){
    this.function1 = function(){
      console.log("called function1");
      //do important stuff
      console.log("completed function1 - returned:"+someReturnValue);
  }
}
```

Using scarlet logger you can attach every instance of a function to the logger, and get rid of extra logging code.
```javascript
var Scarlet = require('scarlet');
var scarlet = new Scarlet('scarlet-contrib-logger');
var scarletLogger = scarlet.plugins.logger;

function FunctionToLog(){
    this.function1 = function(){
      //do important stuff
  }
}
//Attach the logger to the function
FunctionToLog = scarletLogger.bindTo(FunctionToLog);
//-> now any instances of FunctionToLog will log.
```

This can also be helpful in debugging where you just want to find out what is getting called when.  Just attach the logger to an instance like so:

```javascript
scarletLogger.bindTo(someInstance);
someInstance.someFunction();
////-> someFunction will now be logged, along with subsequent calls to methods on *someinstance*
```

[Scarlet](https://github.com/scarletjs/scarlet) is a javascript interceptor that allows access to important information about methods, object names, method names. In addtion, it allows Scarlet Logger get access to a method *before* and *after* it is called.

## Using Your own appender

Scarlet logger uses a console appender as default to use a different appender just do the following when initializing scarlet logger:
```javascript
scarletLogger.appender(customAppender).bindTo(someInstance);
```
by calling the *appender* method with your custom appender the logger will use that instead of the default console appender.

A custom appender must have a *append* method.  Here is an example as follows:
```javascript
var CustomAppender = module.exports = exports =  function(){};

CustomAppender.prototype.append = function(message){
  //do something custom with log message
};
```

## Using Your own Log Interceptor

Scarlet logger uses a log interceptor that logs specfic details; execution time, function names, etc.  If you want to use your own log interceptor do the following:
```javascript
scarletLogger.interceptor(customInterceptor).bindTo(someInstance);
```
by calling the *interceptor* method with your custom interceptor the logger will use that when intercepting methods.

A custom interceptor must be a [Scarlet](https://github.com/scarletjs/scarlet) interceptor.  Here is an example of a simple custom interceptor:
```javascript
var customInterceptor = function(proceed, invocation){
  console.log("Before Method:"+invocation.methodName+" called");
  proceed();
  console.log("After Method:"+invocation.methodName+" called");
}
```
The above doesn't use an appender and is a very basic interceptor.


##Examples

###Start logging a single instance

 ```javascript
//Init ScarletLogger
var Scarlet = require('scarlet');
var scarlet = new Scarlet('scarlet-contrib-logger');
var scarletLogger = scarlet.plugins.logger;

//Define a function to log
function FunctionToLog(){
  this.logMe = function(){ console.log("In logMe"); }
};
var functionToLogInstance = new FunctionToLog();

//Attach Logger to object
scarletLogger.bindTo(functionToLogInstance);

//Now use intercepted object with logging!
functionToLogInstance.logMe();
//-> Outputs the following to the console:
//->[Tue Aug 27 2013 09:39:55 GMT+0100 (BST)] - Debug - calling - FunctionToLog::logMe()
//->In logMe
//->[Tue Aug 27 2013 09:39:55 GMT+0100 (BST)] - Debug - FunctionToLog::logMe() - returned:undefined - execution time(0:0:0.0)
```

###Start logging all instances of a function

 ```javascript
//Init ScarletLogger
var Scarlet = require('scarlet');
var scarlet = new Scarlet('scarlet-contrib-logger');
var scarletLogger = scarlet.plugins.logger;

function FunctionToLog(){
  this.logMe = function(){ console.log("In logMe"); }
};

//Attach Logger to object
FunctionToLog = scarletLogger.bindTo(FunctionToLog);

//Now use intercepted object with logging!
var functionToLogInstance = new FunctionToLog();
//-> Outputs the following to the console:
//->[Tue Aug 27 2013 09:39:55 GMT+0100 (BST)] - Debug - calling - FunctionToLog::FunctionToLog()
//->[Tue Aug 27 2013 09:39:55 GMT+0100 (BST)] - Debug - FunctionToLog::FunctionToLog() - returned:undefined - execution time(0:0:0.0)

functionToLogInstance.logMe();
//-> Outputs the following to the console:
//->[Tue Aug 27 2013 09:39:55 GMT+0100 (BST)] - Debug - calling - FunctionToLog::logMe()
//->In logMe
//->[Tue Aug 27 2013 09:39:55 GMT+0100 (BST)] - Debug - FunctionToLog::logMe() - returned:undefined - execution time(0:0:0.0)
```

###Start logging all instances of a prototype function

 ```javascript
//Init ScarletLogger
var Scarlet = require('scarlet');
var scarlet = new Scarlet('scarlet-contrib-logger');
var scarletLogger = scarlet.plugins.logger;
 
//Define an prototype object to log
var ObjectToLog = function (){};
ObjectToLog.prototype.someMethod = function(){return 1;};
  
//Attach Logger to object
ObjectToLog = scarletLogger.bindTo(ObjectToLog);
  
//Now use intercepted object 
var objectToLog = new ObjectToLog();
//-> Outputs the following to the console:
//->[Tue Aug 27 2013 09:50:23 GMT+0100 (BST)] - Debug - calling - FunctionToLog::FunctionToLog()
//-?[Tue Aug 27 2013 09:50:23 GMT+0100 (BST)] - Debug - FunctionToLog::FunctionToLog() - returned:undefined - execution time(0:0:0.1)

//When called will now get logged
var result = objectToLog.someMethod();
//-> Outputs the following to the console:
//->[Tue Aug 27 2013 09:50:23 GMT+0100 (BST)] - Debug - calling - FunctionToLog::logMe()
//->In logMe
//->[Tue Aug 27 2013 09:50:23 GMT+0100 (BST)] - Debug - FunctionToLog::logMe() - returned:undefined - execution time(0:0:0.0)
```
