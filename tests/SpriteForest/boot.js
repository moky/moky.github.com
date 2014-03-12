;
/**
 *  Author:
 *      Moky @ Mar. 12, 2014
 */

//
// application configuration
//
document.ccConfig = {
	COCOS2D_DEBUG: 2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
	box2d: false,
	chipmunk: false,
	showFPS: true,
	frameRate: 60,
	loadExtension: false,
	renderMode: 0, //Choose of RenderMode: 0(default), 1(Canvas only), 2(WebGL only)
	tag: 'gameCanvas', //the dom element to run cocos2d on
};

var boot = boot || {};

boot.jsFiles = [
	'libs/cocos2d.min.js',
	'libs/spriteforest.min.js',
	
	'js/patch.js', // patches for cocos2d
	
	'js/myApp.js',
	'js/resource.js',
	'js/main.js',
];

!function(boot) {
	'use strict';
	
	//------------------------------------------------------------- Environments
	
	/**
	 *  Environment variables
	 */
	var __FILE__ = 'boot.js'; // current filename
	var __PATH__ = '';        // current filepath
	var __SCRIPT__ = null;    // current script
	
	var scripts = document.getElementsByTagName('script');
	if (scripts) {
		for (var i = scripts.length - 1; i >= 0; --i) {
			var url = scripts[i].src;
			var pos = url.indexOf('?');
			if (pos >= 0) {
				url = url.substring(0, pos);
			}
			var pos = url.indexOf('#');
			if (pos >= 0) {
				url = url.substring(0, pos);
			}
			pos = url.lastIndexOf(__FILE__);
			if (pos > 0) {
				boot.script = __SCRIPT__ = scripts[i];
				boot.base = __PATH__ = __SCRIPT__.src.substring(0, pos);
				break;
			}
		}
	}
	
	//---------------------------------------------------------------- Js Loader
	
	var loader = boot.loader = boot.loader || {};
	
	loader.add = function(url) {
		if (this.scripts) {
			loader.scripts.push(url);
		} else {
			loader.scripts = [ url ];
		}
	}
	
	var jsFiles = boot.jsFiles || [];
	// js files
	if (__SCRIPT__ && __SCRIPT__.getAttribute("main")) {
		// main.js
		jsFiles.push(__SCRIPT__.getAttribute("main"));
	}
	for (var i = 0; i < boot.jsFiles.length; ++i) {
		loader.add(__PATH__ + jsFiles[i]);
	}
	
	//
	// main
	//
	
	var loaded = 0;
	
	var onload = function() {
		this.removeEventListener('load', onload, false);
		++loaded;
		load_next();
	};
	
	var load_next = function () {
		if (loader.scripts.length <= loaded) {
			// finished
			return;
		}
		
		var s = document.createElement('script');
		s.src = loader.scripts[loaded];
		s.addEventListener('load', onload, false);
		
		// load
		var head = document.getElementsByTagName("head")[0] || document.documentElement;
		if (head) {
			head.appendChild(s);
		}
	};
	
	load_next();
	
}(boot);

//
// function.bind(...)
//
if (!Function.prototype.bind) {
	Function.prototype.bind = function (oThis) {
		if (typeof this !== "function") {
			// closest thing possible to the ECMAScript 5 internal IsCallable function
			throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
		}
		var aArgs = Array.prototype.slice.call(arguments, 1),
		fToBind = this,
		fNOP = function () {},
		fBound = function () {
			return fToBind.apply(this instanceof fNOP && oThis
								 ? this
								 : oThis,
								 aArgs.concat(Array.prototype.slice.call(arguments)));
		};
		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();
		return fBound;
	};
}
