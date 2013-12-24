
(function() {

	/**
	 *  Environment variables
	 */
	var __FILE__ = ""; // current filename
	var __PATH__ = ""; // current filepath
	
	var scripts = document.getElementsByTagName("script");
	if (scripts) {
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
	importJS(__PATH__ + "stat.js");
	
})();

function load_qzone() {
	
	qzone().templates(js_base + "../widgets/qzone-categories.html",
					  js_base + "../widgets/qzone-articles.html").apply("#qzone");
	
}

function apply_template(data, url) {
	
	// apply template
	var template = new tarsier.Template(data, url);
	template.apply(document);
	
	// load articles widget
	widget.articles("#articles",
					js_base + "../widgets/articles.html",
					js_base + "../sitemap.xml");
	
	// load qzone
	setTimeout(load_qzone, 3000); // delay 3 seconds
}

//------ main
function main() {
	try {
		
		// load template
		tarsier.http.ajax({
						  url: "../templates/article.html",
						  dataType: "html",
						  //cache: false,
						  success: function(data) { apply_template(data, this.url); },
						  error: function() { alert("Error loading template: " + url); }
		});
		
	} catch(e) {
		//alert("article.js: " + e);
	}
}
