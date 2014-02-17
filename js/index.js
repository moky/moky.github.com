
!function() {

	/**
	 *  Environment variables
	 */
	var __FILE__ = "index.js"; // current filename
	var __PATH__ = ""; // current filepath
	
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
	importJS(__PATH__ + "common.js");
	importJS(__PATH__ + "widget.js");
	
}();

//------ main
function main() {
	try {
		
		widget.articles("#articles", "widgets/articles.html", "sitemap.xml");
		
		tarsier.importCSS("3rd/mmenu/css/jquery.mmenu.css");
		tarsier.importJS("3rd/mmenu/js/jquery.mmenu.min.js",
						 function() {
							$("header h1").css("visibility", "visible");
							var menu = $("aside");
							menu.css("visibility", "visible");
							menu.mmenu();
						 });
		
		// copyright
		copyright("#copyright");
		
	} catch(e) {
		//alert("[index.js] error: " + e);
	}
}
