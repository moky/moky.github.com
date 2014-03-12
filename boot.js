;
/**
 *  Author:
 *      Moky @ Mar. 11, 2014
 */

var boot = boot || {};

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
	
	// preparing lib files
	var libFiles = [
		'3rd/jquery.min.js',
		'3rd/jquery.tmpl.min.js',
		'3rd/jquery.xml2json.js',
	
		'src/base.js',
		'src/log.js',
		'src/object.js',
		'src/string.js',
		'src/string.utf.js',
		'src/string.gb2312.js',
		'src/string.base64.js',
		'src/xml.js',
		'src/http.js',
		'src/template.js',
		'src/widget.js',
	];
	for (var i = 0; i < libFiles.length; ++i) {
		loader.add('/~Moky/GitHub/Tarsier/' + libFiles[i]);
	}
	// lib files prepared
	
	// preparing common files
	var jsFiles = [
		'js/common.js',
	];
	if (__SCRIPT__ && __SCRIPT__.getAttribute("main")) {
		// main.js
		jsFiles.push(__SCRIPT__.getAttribute("main"));
	}
	for (var i = 0; i < jsFiles.length; ++i) {
		loader.add(__PATH__ + jsFiles[i]);
	}
	// common files prepared
	
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

