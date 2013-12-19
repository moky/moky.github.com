
(function() {

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
	
})();

function template_main() {
	try {
		
		// load articles
		articles("#articles", "../widgets/articles.html", "../sitemap.xml");
		
		// load qzone
		qzone().templates("../widgets/qzone-categories.html", "../widgets/qzone-articles.html").apply("#qzone");
		
	} catch(e) {
		//alert("article.js: " + e);
	}
}

function load_template(url) {
	
	tarsier.http.ajax({
					  url: url,
					  dataType: "html",
					  //cache: false,
					  success: function(data) {
						var template = new tarsier.Template(data, this.url);
						template.apply(document);
						tarsier.ready(template_main);
					  },
					  error: function() { alert("Error loading template: " + url); }
	});
}

//------ main
function main() {
	try {
		
		load_template("../templates/article.html");
		
	} catch(e) {
		//alert("article.js: " + e);
	}
}
