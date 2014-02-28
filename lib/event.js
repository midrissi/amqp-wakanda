/* 
 * Simple event implementation
 */
var Class = require('./class');
var Event = Class.extend({
	init: function () {
		this._maxListeners = this._maxListeners || -1;
	}
});

Event.prototype.on = function on(arg0, arg1) {
	this._listeners =  this._listeners || {};

	switch(typeof arg0){
		case 'string':
			if(Object.prototype.toString.call(this._listeners[arg0]) !== '[object Array]'){
				this._listeners[arg0] = [];
			};

			if(typeof arg1 === 'function'){
				this._listeners[arg0].push(arg1);
			};

			break;
		case 'object':
			for(var attr in arg0){
				var func = arg0[attr];

				if(Object.prototype.toString.call(this._listeners[attr]) !== '[object Array]'){
					this._listeners[attr] = [];
				};

				if(typeof func === 'function' && (this._maxListeners < 0 || this._listeners[attr].length < this._maxListeners)){
					this._listeners[attr].push(func);
				};
			}
			break;
	}

	return this;
};

Event.prototype.addListener = Event.prototype.on;

Event.prototype.off = function off(evName) {
	delete this._listeners[evName];
};

Event.prototype.trigger = function trigger(name) {
	if(this._listeners && Array.isArray(this._listeners[name])){
		var _listeners = this._listeners[name];
		var params = Array.prototype.slice.call(arguments);

		params.splice(0,1);

		for(var i = 0, listener; listener = _listeners[i]; i++){
			listener.apply(this, params);
		};
	}
};

Event.prototype.emit = Event.prototype.trigger;

Event.prototype.setMaxListeners = function(n) {
  if (typeof n !== 'number' || n < 0)
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
};

module.exports = Event;