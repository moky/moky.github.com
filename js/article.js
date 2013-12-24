
(function() {

	/**
	 *  Environment variables
	 */
	var __FILE__ = ""; // current filename
	var __PATH__ = ""; // current filepath
	
	var scripts = document.getElementsByTagName("script");
	if (scripts && scripts.length > 0) {
		for (var i = scripts.length - 1; i >= 0; --i) {
			if (scripts[i].src.lastIndexOf("article.js") > 0) {
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
	importJS(__PATH__ + "qzone.js");
	
})();

//------ main
function main() {
	try {
		
		// load template
		tarsier.http.ajax({
						  url: "../templates/article.html",
						  dataType: "html",
						  //cache: false,
						  success: function(data) {
							// apply template
							var template = new tarsier.Template(data, this.url);
							template.apply(document);
							// load articles widget
							widget.articles("#articles", "../widgets/articles.html", "../sitemap.xml");
							// load qzone
							qzone().templates("../widgets/qzone-categories.html", "../widgets/qzone-articles.html").apply("#qzone");
						  },
						  error: function() {
							alert("Error loading template: " + url);
						  }
		});
		
	} catch(e) {
		//alert("article.js: " + e);
	}
}
