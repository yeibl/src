/*
** NOTE: This file is generated by Gulp and should not be edited directly!
** Any changes made directly to this file will be overwritten next time its asset group is processed by Gulp.
*/

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
	var initializing = false;

	// The base JQClass implementation (does nothing)
	window.JQClass = function(){};

	// Collection of derived classes
	JQClass.classes = {};
 
	// Create a new JQClass that inherits from this class
	JQClass.extend = function extender(prop) {
		var base = this.prototype;

		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;

		// Copy the properties over onto the new prototype
		for (var name in prop) {
			// Check if we're overwriting an existing function
			prototype[name] = typeof prop[name] == 'function' &&
				typeof base[name] == 'function' ?
				(function(name, fn){
					return function() {
						var __super = this._super;

						// Add a new ._super() method that is the same method
						// but on the super-class
						this._super = function(args) {
							return base[name].apply(this, args || []);
						};

						var ret = fn.apply(this, arguments);				

						// The method only need to be bound temporarily, so we
						// remove it when we're done executing
						this._super = __super;

						return ret;
					};
				})(name, prop[name]) :
				prop[name];
		}

		// The dummy class constructor
		function JQClass() {
			// All construction is actually done in the init method
			if (!initializing && this._init) {
				this._init.apply(this, arguments);
			}
		}

		// Populate our constructed prototype object
		JQClass.prototype = prototype;

		// Enforce the constructor to be what we expect
		JQClass.prototype.constructor = JQClass;

		// And make this class extendable
		JQClass.extend = extender;

		return JQClass;
	};
})();

(function($) { // Ensure $, encapsulate

	/** Abstract base class for collection plugins v1.0.1.
		Written by Keith Wood (kbwood{at}iinet.com.au) December 2013.
		Licensed under the MIT (https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt) license.
		@module $.JQPlugin
		@abstract */
	JQClass.classes.JQPlugin = JQClass.extend({

		/** Name to identify this plugin.
			@example name: 'tabs' */
		name: 'plugin',

		/** Default options for instances of this plugin (default: {}).
			@example defaultOptions: {
 	selectedClass: 'selected',
 	triggers: 'click'
 } */
		defaultOptions: {},
		
		/** Options dependent on the locale.
			Indexed by language and (optional) country code, with '' denoting the default language (English/US).
			@example regionalOptions: {
	'': {
		greeting: 'Hi'
	}
 } */
		regionalOptions: {},
		
		/** Names of getter methods - those that can't be chained (default: []).
			@example _getters: ['activeTab'] */
		_getters: [],

		/** Retrieve a marker class for affected elements.
			@private
			@return {string} The marker class. */
		_getMarker: function() {
			return 'is-' + this.name;
		},
		
		/** Initialise the plugin.
			Create the jQuery bridge - plugin name <code>xyz</code>
			produces <code>$.xyz</code> and <code>$.fn.xyz</code>. */
		_init: function() {
			// Apply default localisations
			$.extend(this.defaultOptions, (this.regionalOptions && this.regionalOptions['']) || {});
			// Camel-case the name
			var jqName = camelCase(this.name);
			// Expose jQuery singleton manager
			$[jqName] = this;
			// Expose jQuery collection plugin
			$.fn[jqName] = function(options) {
				var otherArgs = Array.prototype.slice.call(arguments, 1);
				if ($[jqName]._isNotChained(options, otherArgs)) {
					return $[jqName][options].apply($[jqName], [this[0]].concat(otherArgs));
				}
				return this.each(function() {
					if (typeof options === 'string') {
						if (options[0] === '_' || !$[jqName][options]) {
							throw 'Unknown method: ' + options;
						}
						$[jqName][options].apply($[jqName], [this].concat(otherArgs));
					}
					else {
						$[jqName]._attach(this, options);
					}
				});
			};
		},

		/** Set default values for all subsequent instances.
			@param options {object} The new default options.
			@example $.plugin.setDefauls({name: value}) */
		setDefaults: function(options) {
			$.extend(this.defaultOptions, options || {});
		},
		
		/** Determine whether a method is a getter and doesn't permit chaining.
			@private
			@param name {string} The method name.
			@param otherArgs {any[]} Any other arguments for the method.
			@return {boolean} True if this method is a getter, false otherwise. */
		_isNotChained: function(name, otherArgs) {
			if (name === 'option' && (otherArgs.length === 0 ||
					(otherArgs.length === 1 && typeof otherArgs[0] === 'string'))) {
				return true;
			}
			return $.inArray(name, this._getters) > -1;
		},
		
		/** Initialise an element. Called internally only.
			Adds an instance object as data named for the plugin.
			@param elem {Element} The element to enhance.
			@param options {object} Overriding settings. */
		_attach: function(elem, options) {
			elem = $(elem);
			if (elem.hasClass(this._getMarker())) {
				return;
			}
			elem.addClass(this._getMarker());
			options = $.extend({}, this.defaultOptions, this._getMetadata(elem), options || {});
			var inst = $.extend({name: this.name, elem: elem, options: options},
				this._instSettings(elem, options));
			elem.data(this.name, inst); // Save instance against element
			this._postAttach(elem, inst);
			this.option(elem, options);
		},

		/** Retrieve additional instance settings.
			Override this in a sub-class to provide extra settings.
			@param elem {jQuery} The current jQuery element.
			@param options {object} The instance options.
			@return {object} Any extra instance values.
			@example _instSettings: function(elem, options) {
 	return {nav: elem.find(options.navSelector)};
 } */
		_instSettings: function(elem, options) {
			return {};
		},

		/** Plugin specific post initialisation.
			Override this in a sub-class to perform extra activities.
			@param elem {jQuery} The current jQuery element.
			@param inst {object} The instance settings.
			@example _postAttach: function(elem, inst) {
 	elem.on('click.' + this.name, function() {
 		...
 	});
 } */
		_postAttach: function(elem, inst) {
		},

		/** Retrieve metadata configuration from the element.
			Metadata is specified as an attribute:
			<code>data-&lt;plugin name>="&lt;setting name>: '&lt;value>', ..."</code>.
			Dates should be specified as strings in this format: 'new Date(y, m-1, d)'.
			@private
			@param elem {jQuery} The source element.
			@return {object} The inline configuration or {}. */
		_getMetadata: function(elem) {
			try {
				var data = elem.data(this.name.toLowerCase()) || '';
				data = data.replace(/'/g, '"');
				data = data.replace(/([a-zA-Z0-9]+):/g, function(match, group, i) { 
					var count = data.substring(0, i).match(/"/g); // Handle embedded ':'
					return (!count || count.length % 2 === 0 ? '"' + group + '":' : group + ':');
				});
				data = $.parseJSON('{' + data + '}');
				for (var name in data) { // Convert dates
					var value = data[name];
					if (typeof value === 'string' && value.match(/^new Date\((.*)\)$/)) {
						data[name] = eval(value);
					}
				}
				return data;
			}
			catch (e) {
				return {};
			}
		},

		/** Retrieve the instance data for element.
			@param elem {Element} The source element.
			@return {object} The instance data or {}. */
		_getInst: function(elem) {
			return $(elem).data(this.name) || {};
		},
		
		/** Retrieve or reconfigure the settings for a plugin.
			@param elem {Element} The source element.
			@param name {object|string} The collection of new option values or the name of a single option.
			@param [value] {any} The value for a single named option.
			@return {any|object} If retrieving a single value or all options.
			@example $(selector).plugin('option', 'name', value)
 $(selector).plugin('option', {name: value, ...})
 var value = $(selector).plugin('option', 'name')
 var options = $(selector).plugin('option') */
		option: function(elem, name, value) {
			elem = $(elem);
			var inst = elem.data(this.name);
			if  (!name || (typeof name === 'string' && value == null)) {
				var options = (inst || {}).options;
				return (options && name ? options[name] : options);
			}
			if (!elem.hasClass(this._getMarker())) {
				return;
			}
			var options = name || {};
			if (typeof name === 'string') {
				options = {};
				options[name] = value;
			}
			this._optionsChanged(elem, inst, options);
			$.extend(inst.options, options);
		},
		
		/** Plugin specific options processing.
			Old value available in <code>inst.options[name]</code>, new value in <code>options[name]</code>.
			Override this in a sub-class to perform extra activities.
			@param elem {jQuery} The current jQuery element.
			@param inst {object} The instance settings.
			@param options {object} The new options.
			@example _optionsChanged: function(elem, inst, options) {
 	if (options.name != inst.options.name) {
 		elem.removeClass(inst.options.name).addClass(options.name);
 	}
 } */
		_optionsChanged: function(elem, inst, options) {
		},
		
		/** Remove all trace of the plugin.
			Override <code>_preDestroy</code> for plugin-specific processing.
			@param elem {Element} The source element.
			@example $(selector).plugin('destroy') */
		destroy: function(elem) {
			elem = $(elem);
			if (!elem.hasClass(this._getMarker())) {
				return;
			}
			this._preDestroy(elem, this._getInst(elem));
			elem.removeData(this.name).removeClass(this._getMarker());
		},

		/** Plugin specific pre destruction.
			Override this in a sub-class to perform extra activities and undo everything that was
			done in the <code>_postAttach</code> or <code>_optionsChanged</code> functions.
			@param elem {jQuery} The current jQuery element.
			@param inst {object} The instance settings.
			@example _preDestroy: function(elem, inst) {
 	elem.off('.' + this.name);
 } */
		_preDestroy: function(elem, inst) {
		}
	});
	
	/** Convert names from hyphenated to camel-case.
		@private
		@param value {string} The original hyphenated name.
		@return {string} The camel-case version. */
	function camelCase(name) {
		return name.replace(/-([a-z])/g, function(match, group) {
			return group.toUpperCase();
		});
	}
	
	/** Expose the plugin base.
		@namespace "$.JQPlugin" */
	$.JQPlugin = {
	
		/** Create a new collection plugin.
			@memberof "$.JQPlugin"
			@param [superClass='JQPlugin'] {string} The name of the parent class to inherit from.
			@param overrides {object} The property/function overrides for the new class.
			@example $.JQPlugin.createPlugin({
 	name: 'tabs',
 	defaultOptions: {selectedClass: 'selected'},
 	_initSettings: function(elem, options) { return {...}; },
 	_postAttach: function(elem, inst) { ... }
 }); */
		createPlugin: function(superClass, overrides) {
			if (typeof superClass === 'object') {
				overrides = superClass;
				superClass = 'JQPlugin';
			}
			superClass = camelCase(superClass);
			var className = camelCase(overrides.name);
			JQClass.classes[className] = JQClass.classes[superClass].extend(overrides);
			new JQClass.classes[className]();
		}
	};

})(jQuery);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpxdWVyeS5wbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEFBTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJqcXVlcnkucGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogU2ltcGxlIEphdmFTY3JpcHQgSW5oZXJpdGFuY2VcbiAqIEJ5IEpvaG4gUmVzaWcgaHR0cDovL2Vqb2huLm9yZy9cbiAqIE1JVCBMaWNlbnNlZC5cbiAqL1xuLy8gSW5zcGlyZWQgYnkgYmFzZTIgYW5kIFByb3RvdHlwZVxuKGZ1bmN0aW9uKCl7XG5cdHZhciBpbml0aWFsaXppbmcgPSBmYWxzZTtcblxuXHQvLyBUaGUgYmFzZSBKUUNsYXNzIGltcGxlbWVudGF0aW9uIChkb2VzIG5vdGhpbmcpXG5cdHdpbmRvdy5KUUNsYXNzID0gZnVuY3Rpb24oKXt9O1xuXG5cdC8vIENvbGxlY3Rpb24gb2YgZGVyaXZlZCBjbGFzc2VzXG5cdEpRQ2xhc3MuY2xhc3NlcyA9IHt9O1xuIFxuXHQvLyBDcmVhdGUgYSBuZXcgSlFDbGFzcyB0aGF0IGluaGVyaXRzIGZyb20gdGhpcyBjbGFzc1xuXHRKUUNsYXNzLmV4dGVuZCA9IGZ1bmN0aW9uIGV4dGVuZGVyKHByb3ApIHtcblx0XHR2YXIgYmFzZSA9IHRoaXMucHJvdG90eXBlO1xuXG5cdFx0Ly8gSW5zdGFudGlhdGUgYSBiYXNlIGNsYXNzIChidXQgb25seSBjcmVhdGUgdGhlIGluc3RhbmNlLFxuXHRcdC8vIGRvbid0IHJ1biB0aGUgaW5pdCBjb25zdHJ1Y3Rvcilcblx0XHRpbml0aWFsaXppbmcgPSB0cnVlO1xuXHRcdHZhciBwcm90b3R5cGUgPSBuZXcgdGhpcygpO1xuXHRcdGluaXRpYWxpemluZyA9IGZhbHNlO1xuXG5cdFx0Ly8gQ29weSB0aGUgcHJvcGVydGllcyBvdmVyIG9udG8gdGhlIG5ldyBwcm90b3R5cGVcblx0XHRmb3IgKHZhciBuYW1lIGluIHByb3ApIHtcblx0XHRcdC8vIENoZWNrIGlmIHdlJ3JlIG92ZXJ3cml0aW5nIGFuIGV4aXN0aW5nIGZ1bmN0aW9uXG5cdFx0XHRwcm90b3R5cGVbbmFtZV0gPSB0eXBlb2YgcHJvcFtuYW1lXSA9PSAnZnVuY3Rpb24nICYmXG5cdFx0XHRcdHR5cGVvZiBiYXNlW25hbWVdID09ICdmdW5jdGlvbicgP1xuXHRcdFx0XHQoZnVuY3Rpb24obmFtZSwgZm4pe1xuXHRcdFx0XHRcdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHZhciBfX3N1cGVyID0gdGhpcy5fc3VwZXI7XG5cblx0XHRcdFx0XHRcdC8vIEFkZCBhIG5ldyAuX3N1cGVyKCkgbWV0aG9kIHRoYXQgaXMgdGhlIHNhbWUgbWV0aG9kXG5cdFx0XHRcdFx0XHQvLyBidXQgb24gdGhlIHN1cGVyLWNsYXNzXG5cdFx0XHRcdFx0XHR0aGlzLl9zdXBlciA9IGZ1bmN0aW9uKGFyZ3MpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGJhc2VbbmFtZV0uYXBwbHkodGhpcywgYXJncyB8fCBbXSk7XG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHR2YXIgcmV0ID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcdFx0XHRcdFxuXG5cdFx0XHRcdFx0XHQvLyBUaGUgbWV0aG9kIG9ubHkgbmVlZCB0byBiZSBib3VuZCB0ZW1wb3JhcmlseSwgc28gd2Vcblx0XHRcdFx0XHRcdC8vIHJlbW92ZSBpdCB3aGVuIHdlJ3JlIGRvbmUgZXhlY3V0aW5nXG5cdFx0XHRcdFx0XHR0aGlzLl9zdXBlciA9IF9fc3VwZXI7XG5cblx0XHRcdFx0XHRcdHJldHVybiByZXQ7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fSkobmFtZSwgcHJvcFtuYW1lXSkgOlxuXHRcdFx0XHRwcm9wW25hbWVdO1xuXHRcdH1cblxuXHRcdC8vIFRoZSBkdW1teSBjbGFzcyBjb25zdHJ1Y3RvclxuXHRcdGZ1bmN0aW9uIEpRQ2xhc3MoKSB7XG5cdFx0XHQvLyBBbGwgY29uc3RydWN0aW9uIGlzIGFjdHVhbGx5IGRvbmUgaW4gdGhlIGluaXQgbWV0aG9kXG5cdFx0XHRpZiAoIWluaXRpYWxpemluZyAmJiB0aGlzLl9pbml0KSB7XG5cdFx0XHRcdHRoaXMuX2luaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBQb3B1bGF0ZSBvdXIgY29uc3RydWN0ZWQgcHJvdG90eXBlIG9iamVjdFxuXHRcdEpRQ2xhc3MucHJvdG90eXBlID0gcHJvdG90eXBlO1xuXG5cdFx0Ly8gRW5mb3JjZSB0aGUgY29uc3RydWN0b3IgdG8gYmUgd2hhdCB3ZSBleHBlY3Rcblx0XHRKUUNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEpRQ2xhc3M7XG5cblx0XHQvLyBBbmQgbWFrZSB0aGlzIGNsYXNzIGV4dGVuZGFibGVcblx0XHRKUUNsYXNzLmV4dGVuZCA9IGV4dGVuZGVyO1xuXG5cdFx0cmV0dXJuIEpRQ2xhc3M7XG5cdH07XG59KSgpO1xuXG4oZnVuY3Rpb24oJCkgeyAvLyBFbnN1cmUgJCwgZW5jYXBzdWxhdGVcblxuXHQvKiogQWJzdHJhY3QgYmFzZSBjbGFzcyBmb3IgY29sbGVjdGlvbiBwbHVnaW5zIHYxLjAuMS5cblx0XHRXcml0dGVuIGJ5IEtlaXRoIFdvb2QgKGtid29vZHthdH1paW5ldC5jb20uYXUpIERlY2VtYmVyIDIwMTMuXG5cdFx0TGljZW5zZWQgdW5kZXIgdGhlIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9qcXVlcnkvYmxvYi9tYXN0ZXIvTUlULUxJQ0VOU0UudHh0KSBsaWNlbnNlLlxuXHRcdEBtb2R1bGUgJC5KUVBsdWdpblxuXHRcdEBhYnN0cmFjdCAqL1xuXHRKUUNsYXNzLmNsYXNzZXMuSlFQbHVnaW4gPSBKUUNsYXNzLmV4dGVuZCh7XG5cblx0XHQvKiogTmFtZSB0byBpZGVudGlmeSB0aGlzIHBsdWdpbi5cblx0XHRcdEBleGFtcGxlIG5hbWU6ICd0YWJzJyAqL1xuXHRcdG5hbWU6ICdwbHVnaW4nLFxuXG5cdFx0LyoqIERlZmF1bHQgb3B0aW9ucyBmb3IgaW5zdGFuY2VzIG9mIHRoaXMgcGx1Z2luIChkZWZhdWx0OiB7fSkuXG5cdFx0XHRAZXhhbXBsZSBkZWZhdWx0T3B0aW9uczoge1xuIFx0c2VsZWN0ZWRDbGFzczogJ3NlbGVjdGVkJyxcbiBcdHRyaWdnZXJzOiAnY2xpY2snXG4gfSAqL1xuXHRcdGRlZmF1bHRPcHRpb25zOiB7fSxcblx0XHRcblx0XHQvKiogT3B0aW9ucyBkZXBlbmRlbnQgb24gdGhlIGxvY2FsZS5cblx0XHRcdEluZGV4ZWQgYnkgbGFuZ3VhZ2UgYW5kIChvcHRpb25hbCkgY291bnRyeSBjb2RlLCB3aXRoICcnIGRlbm90aW5nIHRoZSBkZWZhdWx0IGxhbmd1YWdlIChFbmdsaXNoL1VTKS5cblx0XHRcdEBleGFtcGxlIHJlZ2lvbmFsT3B0aW9uczoge1xuXHQnJzoge1xuXHRcdGdyZWV0aW5nOiAnSGknXG5cdH1cbiB9ICovXG5cdFx0cmVnaW9uYWxPcHRpb25zOiB7fSxcblx0XHRcblx0XHQvKiogTmFtZXMgb2YgZ2V0dGVyIG1ldGhvZHMgLSB0aG9zZSB0aGF0IGNhbid0IGJlIGNoYWluZWQgKGRlZmF1bHQ6IFtdKS5cblx0XHRcdEBleGFtcGxlIF9nZXR0ZXJzOiBbJ2FjdGl2ZVRhYiddICovXG5cdFx0X2dldHRlcnM6IFtdLFxuXG5cdFx0LyoqIFJldHJpZXZlIGEgbWFya2VyIGNsYXNzIGZvciBhZmZlY3RlZCBlbGVtZW50cy5cblx0XHRcdEBwcml2YXRlXG5cdFx0XHRAcmV0dXJuIHtzdHJpbmd9IFRoZSBtYXJrZXIgY2xhc3MuICovXG5cdFx0X2dldE1hcmtlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gJ2lzLScgKyB0aGlzLm5hbWU7XG5cdFx0fSxcblx0XHRcblx0XHQvKiogSW5pdGlhbGlzZSB0aGUgcGx1Z2luLlxuXHRcdFx0Q3JlYXRlIHRoZSBqUXVlcnkgYnJpZGdlIC0gcGx1Z2luIG5hbWUgPGNvZGU+eHl6PC9jb2RlPlxuXHRcdFx0cHJvZHVjZXMgPGNvZGU+JC54eXo8L2NvZGU+IGFuZCA8Y29kZT4kLmZuLnh5ejwvY29kZT4uICovXG5cdFx0X2luaXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gQXBwbHkgZGVmYXVsdCBsb2NhbGlzYXRpb25zXG5cdFx0XHQkLmV4dGVuZCh0aGlzLmRlZmF1bHRPcHRpb25zLCAodGhpcy5yZWdpb25hbE9wdGlvbnMgJiYgdGhpcy5yZWdpb25hbE9wdGlvbnNbJyddKSB8fCB7fSk7XG5cdFx0XHQvLyBDYW1lbC1jYXNlIHRoZSBuYW1lXG5cdFx0XHR2YXIganFOYW1lID0gY2FtZWxDYXNlKHRoaXMubmFtZSk7XG5cdFx0XHQvLyBFeHBvc2UgalF1ZXJ5IHNpbmdsZXRvbiBtYW5hZ2VyXG5cdFx0XHQkW2pxTmFtZV0gPSB0aGlzO1xuXHRcdFx0Ly8gRXhwb3NlIGpRdWVyeSBjb2xsZWN0aW9uIHBsdWdpblxuXHRcdFx0JC5mbltqcU5hbWVdID0gZnVuY3Rpb24ob3B0aW9ucykge1xuXHRcdFx0XHR2YXIgb3RoZXJBcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblx0XHRcdFx0aWYgKCRbanFOYW1lXS5faXNOb3RDaGFpbmVkKG9wdGlvbnMsIG90aGVyQXJncykpIHtcblx0XHRcdFx0XHRyZXR1cm4gJFtqcU5hbWVdW29wdGlvbnNdLmFwcGx5KCRbanFOYW1lXSwgW3RoaXNbMF1dLmNvbmNhdChvdGhlckFyZ3MpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRcdGlmIChvcHRpb25zWzBdID09PSAnXycgfHwgISRbanFOYW1lXVtvcHRpb25zXSkge1xuXHRcdFx0XHRcdFx0XHR0aHJvdyAnVW5rbm93biBtZXRob2Q6ICcgKyBvcHRpb25zO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0JFtqcU5hbWVdW29wdGlvbnNdLmFwcGx5KCRbanFOYW1lXSwgW3RoaXNdLmNvbmNhdChvdGhlckFyZ3MpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHQkW2pxTmFtZV0uX2F0dGFjaCh0aGlzLCBvcHRpb25zKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0LyoqIFNldCBkZWZhdWx0IHZhbHVlcyBmb3IgYWxsIHN1YnNlcXVlbnQgaW5zdGFuY2VzLlxuXHRcdFx0QHBhcmFtIG9wdGlvbnMge29iamVjdH0gVGhlIG5ldyBkZWZhdWx0IG9wdGlvbnMuXG5cdFx0XHRAZXhhbXBsZSAkLnBsdWdpbi5zZXREZWZhdWxzKHtuYW1lOiB2YWx1ZX0pICovXG5cdFx0c2V0RGVmYXVsdHM6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblx0XHRcdCQuZXh0ZW5kKHRoaXMuZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMgfHwge30pO1xuXHRcdH0sXG5cdFx0XG5cdFx0LyoqIERldGVybWluZSB3aGV0aGVyIGEgbWV0aG9kIGlzIGEgZ2V0dGVyIGFuZCBkb2Vzbid0IHBlcm1pdCBjaGFpbmluZy5cblx0XHRcdEBwcml2YXRlXG5cdFx0XHRAcGFyYW0gbmFtZSB7c3RyaW5nfSBUaGUgbWV0aG9kIG5hbWUuXG5cdFx0XHRAcGFyYW0gb3RoZXJBcmdzIHthbnlbXX0gQW55IG90aGVyIGFyZ3VtZW50cyBmb3IgdGhlIG1ldGhvZC5cblx0XHRcdEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhpcyBtZXRob2QgaXMgYSBnZXR0ZXIsIGZhbHNlIG90aGVyd2lzZS4gKi9cblx0XHRfaXNOb3RDaGFpbmVkOiBmdW5jdGlvbihuYW1lLCBvdGhlckFyZ3MpIHtcblx0XHRcdGlmIChuYW1lID09PSAnb3B0aW9uJyAmJiAob3RoZXJBcmdzLmxlbmd0aCA9PT0gMCB8fFxuXHRcdFx0XHRcdChvdGhlckFyZ3MubGVuZ3RoID09PSAxICYmIHR5cGVvZiBvdGhlckFyZ3NbMF0gPT09ICdzdHJpbmcnKSkpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gJC5pbkFycmF5KG5hbWUsIHRoaXMuX2dldHRlcnMpID4gLTE7XG5cdFx0fSxcblx0XHRcblx0XHQvKiogSW5pdGlhbGlzZSBhbiBlbGVtZW50LiBDYWxsZWQgaW50ZXJuYWxseSBvbmx5LlxuXHRcdFx0QWRkcyBhbiBpbnN0YW5jZSBvYmplY3QgYXMgZGF0YSBuYW1lZCBmb3IgdGhlIHBsdWdpbi5cblx0XHRcdEBwYXJhbSBlbGVtIHtFbGVtZW50fSBUaGUgZWxlbWVudCB0byBlbmhhbmNlLlxuXHRcdFx0QHBhcmFtIG9wdGlvbnMge29iamVjdH0gT3ZlcnJpZGluZyBzZXR0aW5ncy4gKi9cblx0XHRfYXR0YWNoOiBmdW5jdGlvbihlbGVtLCBvcHRpb25zKSB7XG5cdFx0XHRlbGVtID0gJChlbGVtKTtcblx0XHRcdGlmIChlbGVtLmhhc0NsYXNzKHRoaXMuX2dldE1hcmtlcigpKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRlbGVtLmFkZENsYXNzKHRoaXMuX2dldE1hcmtlcigpKTtcblx0XHRcdG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgdGhpcy5kZWZhdWx0T3B0aW9ucywgdGhpcy5fZ2V0TWV0YWRhdGEoZWxlbSksIG9wdGlvbnMgfHwge30pO1xuXHRcdFx0dmFyIGluc3QgPSAkLmV4dGVuZCh7bmFtZTogdGhpcy5uYW1lLCBlbGVtOiBlbGVtLCBvcHRpb25zOiBvcHRpb25zfSxcblx0XHRcdFx0dGhpcy5faW5zdFNldHRpbmdzKGVsZW0sIG9wdGlvbnMpKTtcblx0XHRcdGVsZW0uZGF0YSh0aGlzLm5hbWUsIGluc3QpOyAvLyBTYXZlIGluc3RhbmNlIGFnYWluc3QgZWxlbWVudFxuXHRcdFx0dGhpcy5fcG9zdEF0dGFjaChlbGVtLCBpbnN0KTtcblx0XHRcdHRoaXMub3B0aW9uKGVsZW0sIG9wdGlvbnMpO1xuXHRcdH0sXG5cblx0XHQvKiogUmV0cmlldmUgYWRkaXRpb25hbCBpbnN0YW5jZSBzZXR0aW5ncy5cblx0XHRcdE92ZXJyaWRlIHRoaXMgaW4gYSBzdWItY2xhc3MgdG8gcHJvdmlkZSBleHRyYSBzZXR0aW5ncy5cblx0XHRcdEBwYXJhbSBlbGVtIHtqUXVlcnl9IFRoZSBjdXJyZW50IGpRdWVyeSBlbGVtZW50LlxuXHRcdFx0QHBhcmFtIG9wdGlvbnMge29iamVjdH0gVGhlIGluc3RhbmNlIG9wdGlvbnMuXG5cdFx0XHRAcmV0dXJuIHtvYmplY3R9IEFueSBleHRyYSBpbnN0YW5jZSB2YWx1ZXMuXG5cdFx0XHRAZXhhbXBsZSBfaW5zdFNldHRpbmdzOiBmdW5jdGlvbihlbGVtLCBvcHRpb25zKSB7XG4gXHRyZXR1cm4ge25hdjogZWxlbS5maW5kKG9wdGlvbnMubmF2U2VsZWN0b3IpfTtcbiB9ICovXG5cdFx0X2luc3RTZXR0aW5nczogZnVuY3Rpb24oZWxlbSwgb3B0aW9ucykge1xuXHRcdFx0cmV0dXJuIHt9O1xuXHRcdH0sXG5cblx0XHQvKiogUGx1Z2luIHNwZWNpZmljIHBvc3QgaW5pdGlhbGlzYXRpb24uXG5cdFx0XHRPdmVycmlkZSB0aGlzIGluIGEgc3ViLWNsYXNzIHRvIHBlcmZvcm0gZXh0cmEgYWN0aXZpdGllcy5cblx0XHRcdEBwYXJhbSBlbGVtIHtqUXVlcnl9IFRoZSBjdXJyZW50IGpRdWVyeSBlbGVtZW50LlxuXHRcdFx0QHBhcmFtIGluc3Qge29iamVjdH0gVGhlIGluc3RhbmNlIHNldHRpbmdzLlxuXHRcdFx0QGV4YW1wbGUgX3Bvc3RBdHRhY2g6IGZ1bmN0aW9uKGVsZW0sIGluc3QpIHtcbiBcdGVsZW0ub24oJ2NsaWNrLicgKyB0aGlzLm5hbWUsIGZ1bmN0aW9uKCkge1xuIFx0XHQuLi5cbiBcdH0pO1xuIH0gKi9cblx0XHRfcG9zdEF0dGFjaDogZnVuY3Rpb24oZWxlbSwgaW5zdCkge1xuXHRcdH0sXG5cblx0XHQvKiogUmV0cmlldmUgbWV0YWRhdGEgY29uZmlndXJhdGlvbiBmcm9tIHRoZSBlbGVtZW50LlxuXHRcdFx0TWV0YWRhdGEgaXMgc3BlY2lmaWVkIGFzIGFuIGF0dHJpYnV0ZTpcblx0XHRcdDxjb2RlPmRhdGEtJmx0O3BsdWdpbiBuYW1lPj1cIiZsdDtzZXR0aW5nIG5hbWU+OiAnJmx0O3ZhbHVlPicsIC4uLlwiPC9jb2RlPi5cblx0XHRcdERhdGVzIHNob3VsZCBiZSBzcGVjaWZpZWQgYXMgc3RyaW5ncyBpbiB0aGlzIGZvcm1hdDogJ25ldyBEYXRlKHksIG0tMSwgZCknLlxuXHRcdFx0QHByaXZhdGVcblx0XHRcdEBwYXJhbSBlbGVtIHtqUXVlcnl9IFRoZSBzb3VyY2UgZWxlbWVudC5cblx0XHRcdEByZXR1cm4ge29iamVjdH0gVGhlIGlubGluZSBjb25maWd1cmF0aW9uIG9yIHt9LiAqL1xuXHRcdF9nZXRNZXRhZGF0YTogZnVuY3Rpb24oZWxlbSkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dmFyIGRhdGEgPSBlbGVtLmRhdGEodGhpcy5uYW1lLnRvTG93ZXJDYXNlKCkpIHx8ICcnO1xuXHRcdFx0XHRkYXRhID0gZGF0YS5yZXBsYWNlKC8nL2csICdcIicpO1xuXHRcdFx0XHRkYXRhID0gZGF0YS5yZXBsYWNlKC8oW2EtekEtWjAtOV0rKTovZywgZnVuY3Rpb24obWF0Y2gsIGdyb3VwLCBpKSB7IFxuXHRcdFx0XHRcdHZhciBjb3VudCA9IGRhdGEuc3Vic3RyaW5nKDAsIGkpLm1hdGNoKC9cIi9nKTsgLy8gSGFuZGxlIGVtYmVkZGVkICc6J1xuXHRcdFx0XHRcdHJldHVybiAoIWNvdW50IHx8IGNvdW50Lmxlbmd0aCAlIDIgPT09IDAgPyAnXCInICsgZ3JvdXAgKyAnXCI6JyA6IGdyb3VwICsgJzonKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGRhdGEgPSAkLnBhcnNlSlNPTigneycgKyBkYXRhICsgJ30nKTtcblx0XHRcdFx0Zm9yICh2YXIgbmFtZSBpbiBkYXRhKSB7IC8vIENvbnZlcnQgZGF0ZXNcblx0XHRcdFx0XHR2YXIgdmFsdWUgPSBkYXRhW25hbWVdO1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLm1hdGNoKC9ebmV3IERhdGVcXCgoLiopXFwpJC8pKSB7XG5cdFx0XHRcdFx0XHRkYXRhW25hbWVdID0gZXZhbCh2YWx1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBkYXRhO1xuXHRcdFx0fVxuXHRcdFx0Y2F0Y2ggKGUpIHtcblx0XHRcdFx0cmV0dXJuIHt9O1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKiogUmV0cmlldmUgdGhlIGluc3RhbmNlIGRhdGEgZm9yIGVsZW1lbnQuXG5cdFx0XHRAcGFyYW0gZWxlbSB7RWxlbWVudH0gVGhlIHNvdXJjZSBlbGVtZW50LlxuXHRcdFx0QHJldHVybiB7b2JqZWN0fSBUaGUgaW5zdGFuY2UgZGF0YSBvciB7fS4gKi9cblx0XHRfZ2V0SW5zdDogZnVuY3Rpb24oZWxlbSkge1xuXHRcdFx0cmV0dXJuICQoZWxlbSkuZGF0YSh0aGlzLm5hbWUpIHx8IHt9O1xuXHRcdH0sXG5cdFx0XG5cdFx0LyoqIFJldHJpZXZlIG9yIHJlY29uZmlndXJlIHRoZSBzZXR0aW5ncyBmb3IgYSBwbHVnaW4uXG5cdFx0XHRAcGFyYW0gZWxlbSB7RWxlbWVudH0gVGhlIHNvdXJjZSBlbGVtZW50LlxuXHRcdFx0QHBhcmFtIG5hbWUge29iamVjdHxzdHJpbmd9IFRoZSBjb2xsZWN0aW9uIG9mIG5ldyBvcHRpb24gdmFsdWVzIG9yIHRoZSBuYW1lIG9mIGEgc2luZ2xlIG9wdGlvbi5cblx0XHRcdEBwYXJhbSBbdmFsdWVdIHthbnl9IFRoZSB2YWx1ZSBmb3IgYSBzaW5nbGUgbmFtZWQgb3B0aW9uLlxuXHRcdFx0QHJldHVybiB7YW55fG9iamVjdH0gSWYgcmV0cmlldmluZyBhIHNpbmdsZSB2YWx1ZSBvciBhbGwgb3B0aW9ucy5cblx0XHRcdEBleGFtcGxlICQoc2VsZWN0b3IpLnBsdWdpbignb3B0aW9uJywgJ25hbWUnLCB2YWx1ZSlcbiAkKHNlbGVjdG9yKS5wbHVnaW4oJ29wdGlvbicsIHtuYW1lOiB2YWx1ZSwgLi4ufSlcbiB2YXIgdmFsdWUgPSAkKHNlbGVjdG9yKS5wbHVnaW4oJ29wdGlvbicsICduYW1lJylcbiB2YXIgb3B0aW9ucyA9ICQoc2VsZWN0b3IpLnBsdWdpbignb3B0aW9uJykgKi9cblx0XHRvcHRpb246IGZ1bmN0aW9uKGVsZW0sIG5hbWUsIHZhbHVlKSB7XG5cdFx0XHRlbGVtID0gJChlbGVtKTtcblx0XHRcdHZhciBpbnN0ID0gZWxlbS5kYXRhKHRoaXMubmFtZSk7XG5cdFx0XHRpZiAgKCFuYW1lIHx8ICh0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUgPT0gbnVsbCkpIHtcblx0XHRcdFx0dmFyIG9wdGlvbnMgPSAoaW5zdCB8fCB7fSkub3B0aW9ucztcblx0XHRcdFx0cmV0dXJuIChvcHRpb25zICYmIG5hbWUgPyBvcHRpb25zW25hbWVdIDogb3B0aW9ucyk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIWVsZW0uaGFzQ2xhc3ModGhpcy5fZ2V0TWFya2VyKCkpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHZhciBvcHRpb25zID0gbmFtZSB8fCB7fTtcblx0XHRcdGlmICh0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0b3B0aW9ucyA9IHt9O1xuXHRcdFx0XHRvcHRpb25zW25hbWVdID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9vcHRpb25zQ2hhbmdlZChlbGVtLCBpbnN0LCBvcHRpb25zKTtcblx0XHRcdCQuZXh0ZW5kKGluc3Qub3B0aW9ucywgb3B0aW9ucyk7XG5cdFx0fSxcblx0XHRcblx0XHQvKiogUGx1Z2luIHNwZWNpZmljIG9wdGlvbnMgcHJvY2Vzc2luZy5cblx0XHRcdE9sZCB2YWx1ZSBhdmFpbGFibGUgaW4gPGNvZGU+aW5zdC5vcHRpb25zW25hbWVdPC9jb2RlPiwgbmV3IHZhbHVlIGluIDxjb2RlPm9wdGlvbnNbbmFtZV08L2NvZGU+LlxuXHRcdFx0T3ZlcnJpZGUgdGhpcyBpbiBhIHN1Yi1jbGFzcyB0byBwZXJmb3JtIGV4dHJhIGFjdGl2aXRpZXMuXG5cdFx0XHRAcGFyYW0gZWxlbSB7alF1ZXJ5fSBUaGUgY3VycmVudCBqUXVlcnkgZWxlbWVudC5cblx0XHRcdEBwYXJhbSBpbnN0IHtvYmplY3R9IFRoZSBpbnN0YW5jZSBzZXR0aW5ncy5cblx0XHRcdEBwYXJhbSBvcHRpb25zIHtvYmplY3R9IFRoZSBuZXcgb3B0aW9ucy5cblx0XHRcdEBleGFtcGxlIF9vcHRpb25zQ2hhbmdlZDogZnVuY3Rpb24oZWxlbSwgaW5zdCwgb3B0aW9ucykge1xuIFx0aWYgKG9wdGlvbnMubmFtZSAhPSBpbnN0Lm9wdGlvbnMubmFtZSkge1xuIFx0XHRlbGVtLnJlbW92ZUNsYXNzKGluc3Qub3B0aW9ucy5uYW1lKS5hZGRDbGFzcyhvcHRpb25zLm5hbWUpO1xuIFx0fVxuIH0gKi9cblx0XHRfb3B0aW9uc0NoYW5nZWQ6IGZ1bmN0aW9uKGVsZW0sIGluc3QsIG9wdGlvbnMpIHtcblx0XHR9LFxuXHRcdFxuXHRcdC8qKiBSZW1vdmUgYWxsIHRyYWNlIG9mIHRoZSBwbHVnaW4uXG5cdFx0XHRPdmVycmlkZSA8Y29kZT5fcHJlRGVzdHJveTwvY29kZT4gZm9yIHBsdWdpbi1zcGVjaWZpYyBwcm9jZXNzaW5nLlxuXHRcdFx0QHBhcmFtIGVsZW0ge0VsZW1lbnR9IFRoZSBzb3VyY2UgZWxlbWVudC5cblx0XHRcdEBleGFtcGxlICQoc2VsZWN0b3IpLnBsdWdpbignZGVzdHJveScpICovXG5cdFx0ZGVzdHJveTogZnVuY3Rpb24oZWxlbSkge1xuXHRcdFx0ZWxlbSA9ICQoZWxlbSk7XG5cdFx0XHRpZiAoIWVsZW0uaGFzQ2xhc3ModGhpcy5fZ2V0TWFya2VyKCkpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoaXMuX3ByZURlc3Ryb3koZWxlbSwgdGhpcy5fZ2V0SW5zdChlbGVtKSk7XG5cdFx0XHRlbGVtLnJlbW92ZURhdGEodGhpcy5uYW1lKS5yZW1vdmVDbGFzcyh0aGlzLl9nZXRNYXJrZXIoKSk7XG5cdFx0fSxcblxuXHRcdC8qKiBQbHVnaW4gc3BlY2lmaWMgcHJlIGRlc3RydWN0aW9uLlxuXHRcdFx0T3ZlcnJpZGUgdGhpcyBpbiBhIHN1Yi1jbGFzcyB0byBwZXJmb3JtIGV4dHJhIGFjdGl2aXRpZXMgYW5kIHVuZG8gZXZlcnl0aGluZyB0aGF0IHdhc1xuXHRcdFx0ZG9uZSBpbiB0aGUgPGNvZGU+X3Bvc3RBdHRhY2g8L2NvZGU+IG9yIDxjb2RlPl9vcHRpb25zQ2hhbmdlZDwvY29kZT4gZnVuY3Rpb25zLlxuXHRcdFx0QHBhcmFtIGVsZW0ge2pRdWVyeX0gVGhlIGN1cnJlbnQgalF1ZXJ5IGVsZW1lbnQuXG5cdFx0XHRAcGFyYW0gaW5zdCB7b2JqZWN0fSBUaGUgaW5zdGFuY2Ugc2V0dGluZ3MuXG5cdFx0XHRAZXhhbXBsZSBfcHJlRGVzdHJveTogZnVuY3Rpb24oZWxlbSwgaW5zdCkge1xuIFx0ZWxlbS5vZmYoJy4nICsgdGhpcy5uYW1lKTtcbiB9ICovXG5cdFx0X3ByZURlc3Ryb3k6IGZ1bmN0aW9uKGVsZW0sIGluc3QpIHtcblx0XHR9XG5cdH0pO1xuXHRcblx0LyoqIENvbnZlcnQgbmFtZXMgZnJvbSBoeXBoZW5hdGVkIHRvIGNhbWVsLWNhc2UuXG5cdFx0QHByaXZhdGVcblx0XHRAcGFyYW0gdmFsdWUge3N0cmluZ30gVGhlIG9yaWdpbmFsIGh5cGhlbmF0ZWQgbmFtZS5cblx0XHRAcmV0dXJuIHtzdHJpbmd9IFRoZSBjYW1lbC1jYXNlIHZlcnNpb24uICovXG5cdGZ1bmN0aW9uIGNhbWVsQ2FzZShuYW1lKSB7XG5cdFx0cmV0dXJuIG5hbWUucmVwbGFjZSgvLShbYS16XSkvZywgZnVuY3Rpb24obWF0Y2gsIGdyb3VwKSB7XG5cdFx0XHRyZXR1cm4gZ3JvdXAudG9VcHBlckNhc2UoKTtcblx0XHR9KTtcblx0fVxuXHRcblx0LyoqIEV4cG9zZSB0aGUgcGx1Z2luIGJhc2UuXG5cdFx0QG5hbWVzcGFjZSBcIiQuSlFQbHVnaW5cIiAqL1xuXHQkLkpRUGx1Z2luID0ge1xuXHRcblx0XHQvKiogQ3JlYXRlIGEgbmV3IGNvbGxlY3Rpb24gcGx1Z2luLlxuXHRcdFx0QG1lbWJlcm9mIFwiJC5KUVBsdWdpblwiXG5cdFx0XHRAcGFyYW0gW3N1cGVyQ2xhc3M9J0pRUGx1Z2luJ10ge3N0cmluZ30gVGhlIG5hbWUgb2YgdGhlIHBhcmVudCBjbGFzcyB0byBpbmhlcml0IGZyb20uXG5cdFx0XHRAcGFyYW0gb3ZlcnJpZGVzIHtvYmplY3R9IFRoZSBwcm9wZXJ0eS9mdW5jdGlvbiBvdmVycmlkZXMgZm9yIHRoZSBuZXcgY2xhc3MuXG5cdFx0XHRAZXhhbXBsZSAkLkpRUGx1Z2luLmNyZWF0ZVBsdWdpbih7XG4gXHRuYW1lOiAndGFicycsXG4gXHRkZWZhdWx0T3B0aW9uczoge3NlbGVjdGVkQ2xhc3M6ICdzZWxlY3RlZCd9LFxuIFx0X2luaXRTZXR0aW5nczogZnVuY3Rpb24oZWxlbSwgb3B0aW9ucykgeyByZXR1cm4gey4uLn07IH0sXG4gXHRfcG9zdEF0dGFjaDogZnVuY3Rpb24oZWxlbSwgaW5zdCkgeyAuLi4gfVxuIH0pOyAqL1xuXHRcdGNyZWF0ZVBsdWdpbjogZnVuY3Rpb24oc3VwZXJDbGFzcywgb3ZlcnJpZGVzKSB7XG5cdFx0XHRpZiAodHlwZW9mIHN1cGVyQ2xhc3MgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdG92ZXJyaWRlcyA9IHN1cGVyQ2xhc3M7XG5cdFx0XHRcdHN1cGVyQ2xhc3MgPSAnSlFQbHVnaW4nO1xuXHRcdFx0fVxuXHRcdFx0c3VwZXJDbGFzcyA9IGNhbWVsQ2FzZShzdXBlckNsYXNzKTtcblx0XHRcdHZhciBjbGFzc05hbWUgPSBjYW1lbENhc2Uob3ZlcnJpZGVzLm5hbWUpO1xuXHRcdFx0SlFDbGFzcy5jbGFzc2VzW2NsYXNzTmFtZV0gPSBKUUNsYXNzLmNsYXNzZXNbc3VwZXJDbGFzc10uZXh0ZW5kKG92ZXJyaWRlcyk7XG5cdFx0XHRuZXcgSlFDbGFzcy5jbGFzc2VzW2NsYXNzTmFtZV0oKTtcblx0XHR9XG5cdH07XG5cbn0pKGpRdWVyeSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
