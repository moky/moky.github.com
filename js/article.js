
(function() {

	/**
	 *  Environment variables
	 */
	var __FILE__ = "article.js"; // current filename
	var __PATH__ = "";           // current filepath
	
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
	importJS(__PATH__ + "qzone.js");
	
})();

function load_qzone() {
	
	qzone().templates(js_base + "../widgets/qzone-categories.html",
					  js_base + "../widgets/qzone-articles.html").apply("#qzone");
	
}

function show_page_qrcode() {
	var text = document.location.href;
	
	var div = $("#page_qrcode");
	try {
		var size = div.width();
		div.html("");
		div.css("display", "inline-block");
		div.css("background-color", "white");
		qrcode({target: div, text: text, width: size, height: size});
	} catch(e) {
		tarsier.error(e);
		div.remove();
	}
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
	setTimeout(load_qzone, 5000); // delay 5 seconds
	
	// build page qrcode
	tarsier.importJS(js_base + "qrcode.js");
	setTimeout(show_page_qrcode, 3000); // delay 3 seconds
	
	// copyright
	copyright("#copyright");
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
