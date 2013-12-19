;
/**
 *  Author:
 *      Moky @ Dec. 10, 2013
 */

(function() {

	/**
	 *  Environment variables
	 */
	var __FILE__ = ""; // current filename
	var __PATH__ = ""; // current filepath
	
	var scripts = document.getElementsByTagName("script");
	if (scripts && scripts.length > 0) {
		for (var i = scripts.length - 1; i >= 0; --i) {
			if (scripts[i].src.lastIndexOf("common.js") > 0) {
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
	importJS(__PATH__ + "qzone.js");
	
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

// articles widget
function articles(target, template, dataSource) {
	var widget = new tarsier.Widget(target);
	widget.show = function() {
		if (this.template == null || this.data == null || this.target == null) return;
		$(this.target).html("");
		var name = this.target;
		$.template(name, this.template);
		$.tmpl(name, this.data.url).appendTo(this.target);
	};
	widget.query(template, dataSource);
}
