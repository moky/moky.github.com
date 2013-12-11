
/**
 *  Author:
 *      Moky @ Dec. 10, 2013
 */

(function()
{
	/**
	 *  Environment variables
	 */
	var __FILE__ = ""; // current filename
	var __PATH__ = ""; // current filepath
	
	var scripts = document.getElementsByTagName("script");
	if (scripts && scripts.length > 0) {
		__FILE__ = scripts[scripts.length - 1].src;
		var pos = __FILE__.lastIndexOf("/");
		if (pos >= 0) {
			__PATH__ = __FILE__.substr(0, pos + 1);
			__FILE__ = __FILE__.substr(pos + 1);
		}
	}
	
	/**
	 *  Import javascript file
	 */
	function importJS(args) {
		var src = args.src;
		var callback = args.callback;
		var doc = args.document || window.document;
		
		var script = doc.createElement("script");
		if (script) {
			script.type = "text/javascript";
			script.src = src;
			if (callback) {
				script.onload = callback;
				// IE
				script.onreadystatechange = function() {
					if (this.readyState == 'complete') {
						callback();
					}
				}
			}
			var head = doc.getElementsByTagName("head");
			if (head) {
				head.item(0).appendChild(script);
			}
		}
	}
	
	// import all dependences
	importJS({src: "https://raw.github.com/moky/Tarsier/master/tarsier.js"});
}
 )();

/**
 *
 *    Main entrance
 *
 */
if (typeof(main) == "function") {
	window.onload = main;
}
