
(function() {

	/**
	 *  Environment variables
	 */
	var __FILE__ = ""; // current filename
	var __PATH__ = ""; // current filepath
	
	var scripts = document.getElementsByTagName("script");
	if (scripts) {
		for (var i = scripts.length - 1; i >= 0; --i) {
			if (scripts[i].src.lastIndexOf("index.js") > 0) {
				__FILE__ = scripts[i].src;
				var pos = __FILE__.lastIndexOf("/");
				if (pos >= 0) {
					__PATH__ = __FILE__.substring(0, pos + 1);
					__FILE__ = __FILE__.substring(pos + 1);
				}
			}
		}
	}
	
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
					if (this.readyState == 'complete') {
						callback();
					}
				}
			}
			var head = document.getElementsByTagName("head");
			if (head) {
				head.item(0).appendChild(script);
			}
		}
	}
	
	// import all dependences
	importJS(__PATH__ + "common.js");
	importJS(__PATH__ + "widget.js");
	
})();

//------ main
function main() {
	try {
		
		widget.articles("#articles", "widgets/articles.html", "sitemap.xml");
		
		// copyright
		copyright("#copyright");
		
	} catch(e) {
		//alert("[index.js] error: " + e);
	}
}
