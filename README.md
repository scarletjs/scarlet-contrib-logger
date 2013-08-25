scarlet-contrib-logger
======================

A Simple Logger Using Scarlet

#Install

  `npm install scarlet-contrib-logger`

#Start logging

   ```javascript
  //Init ScarletLogger
  var ScarletLogger = require("scarlet-contrib-logger");
  var scarletLogger = new ScarletLogger();
   
  //Define a function to log
  var objectToLog = {
    logMe : function(){
      console.log("In LogMe");
    }
  };
    
  //Attach Logger to object
  objectToLog = scarletLogger.appender().bindTo(objectToLog);
    
  //Now use intercepted object with logging!
  objectToLog.logMe();
  ```

#Start logging with a prototype object

   ```javascript
  //Init ScarletLogger
  var ScarletLogger = require("scarlet-contrib-logger");
  var scarletLogger = new ScarletLogger();
   
  //Define an prototype object to log
  var ObjectToLog = function (){};
  ObjectToLog.prototype.someMethod = function(){return 1;};
    
  //Attach Logger to object
  ObjectToLog = scarletLogger.appender().bindTo(ObjectToLog);
    
  //Now use intercepted object 
  var objectToLog = new ObjectToLog();
    
  //When called will now get logged
  var result = objectToLog.someMethod();
  ```
