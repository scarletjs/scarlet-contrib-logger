var scarlet = require("scarlet");
var ScarletLogger = require("./lib/scarlet-contrib-logger.js");

module.exports = function() {
	return new ScarletLogger(scarlet);
};