;
/**
 *  Author:
 *      Moky @ Dec. 19, 2013
 */

if (typeof(code) == "undefined") {
	code = {
	};
}

code.highlight = function() {
	
	function one() {
		try {
			var thiz = $(this);
			var language = thiz.attr("language") || "javascript";
			var html = thiz.html();
			html = html.replace(/\</g, "&lt;");
			html = html.replace(/\>/g, "&gt;");
			var pre = $("<pre>" + html + "</pre>");
			thiz.html("");
			pre.appendTo(thiz);
			pre.snippet(language, { style: "emacs", showNum: true });
		} catch(e) {
			//alert("[code.js] error: " + e);
		}
	}
	
	$("code").each(one);
};

tarsier.ready(code.highlight);

//tarsier.importCSS("http://steamdev.com/snippet/css/jquery.snippet.min.css");
//tarsier.importJS("http://steamdev.com/snippet/js/jquery.snippet.min.js");

tarsier.importCSS("http://moky.github.io/Tarsier/3rd/jquery.snippet.min.css");
tarsier.importJS("http://moky.github.io/Tarsier/3rd/jquery.snippet.min.js");


