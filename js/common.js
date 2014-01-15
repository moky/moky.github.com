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
	importJS("http://moky.github.io/Tarsier/tarsier.js",
			 function() {
				/**
				 *
				 *    Main entrance
				 *
				 */
				if (typeof(main) == "function") {
					tarsier.ready(main);
				}
			 }
	);
	
})();

//
//  update copyright info.
//
function copyright(target) {
	var text = "&copy;" + ((new Date()).getFullYear()) + " moKy";
	if (target) {
		$(target).html(text);
	}
	return text;
}
