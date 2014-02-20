;
/**
 *  Author:
 *      Moky @ Dec. 10, 2013
 */

var js_base = "";

(function() {

	/**
	 *  Environment variables
	 */
	var __FILE__ = "common.js"; // current filename
	var __PATH__ = "";          // current filepath
	
	var scripts = document.getElementsByTagName("script");
	if (scripts) {
		for (var i = scripts.length - 1; i >= 0; --i) {
			var pos = scripts[i].src.lastIndexOf(__FILE__);
			if (pos > 0) {
				__PATH__ = scripts[i].src.substring(0, pos);
				break;
			}
		}
	}
	
	js_base = __PATH__;
	
	/**
	 *  Import javascript file
	 */
	function importJS(src, callback) {
		var script = document.createElement("script");
		if (script) {
			script.type = "text/javascript";
			script.src = src;
			if (callback) {
				script.onload = callback;
				// IE
				script.onreadystatechange = function() {
					if (this.readyState === "complete") {
						callback();
					}
				}
			}
			var head = document.getElementsByTagName("head")[0] || document.documentElement;
			if (head) {
				head.appendChild(script);
			}
		}
	}
	
	// import all dependences
	importJS("http://moky.github.io/Tarsier/base.js", // include base lib of tarsier
			 function() {
				importJS("http://moky.github.io/Tarsier/tarsier.js"); // include all other tarsier libs
				/**
				 *
				 *    Main entrance
				 *
				 */
				tarsier.ready(function() {
					if (typeof(tarsier.uri.parse) === "function") {
						$_GET = tarsier.uri.parse(document.location.href).params;
					}
					if (typeof(main) === "function") {
						main();
						
						for (var i = 0; i < 100; ++i) {
							setTimeout(prepare_links, 500 * i);
						}
					}
				});
			 }
	);
	
})();

function prepare_links() {
	
	function is_link(url) {
		if (!url) return false;
		if (url.charAt(0) == "#") return false;
		if (url.indexOf("javascript:") >= 0) return false;
		return true;
	}
	
	function process(a) {
		var href = a.attr("href");
		if (is_link(href)) {
			a.attr("title", href);
			a.attr("onclick", "javascript: document.location.href = unescape('" + escape(href) + "');");
			a.attr("href", "javascript: void(0);");
		}
	}
	
	$("a").each(function() {
		process($(this));
	});
}

//------------------------------------------------------------------------------

var $_GET = {};

function year() {
	return (new Date()).getFullYear();
}

//
//  update copyright info.
//
function copyright(target) {
	var text = "&copy;" + year() + " moKy";
	if (target) {
		$(target).html(text);
	}
	return text;
}
