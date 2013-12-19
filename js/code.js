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
		var thiz = $(this);
		var language = thiz.attr("language") || "javascript";
		var pre = $("<pre>" + thiz.html() + "</pre>");
		thiz.html("");
		pre.appendTo(thiz);
		pre.snippet(language, { style: "emacs", showNum: true });
	}
	
	try {
		$("code").each(one);
	} catch(e) {
		//alert("[code.js] error: " + e);
	}
};

tarsier.ready(code.highlight);

//tarsier.importCSS("http://steamdev.com/snippet/css/jquery.snippet.min.css");
//tarsier.importJS("http://steamdev.com/snippet/js/jquery.snippet.min.js");

tarsier.importCSS("http://moky.github.io/Tarsier/3rd/jquery.snippet.min.css");
tarsier.importJS("http://moky.github.io/Tarsier/3rd/jquery.snippet.min.js");


