
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
	importJS({src: __PATH__ + "common.js"});
	
})();

//function apply_template(data) {
//	var template = new tarsier.Template(data, this.url);
//	template.apply(document);
//	alert(template.data);
//}

//------ main
function main() {
	try {
		
		var template_path = "../templates/";
		var template_file = "article.html";
		
		tarsier.http.ajax({
						  url: template_path + template_file,
						  dataType: "html",
						  //cache: false,
						  success: function(data) { (new tarsier.Template(data, this.url)).apply(document); },
						  error: function() { alert("Error loading template: " + template_file); }
		});
		
	} catch(e) {
		//alert("article.js: " + e);
	}
}
