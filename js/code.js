;
/**
 *  Author:
 *      Moky @ Dec. 19, 2013
 */


function highlight_codes() {
	
	function one() {
		var thiz = $(this);
		var lang = thiz.attr("language");
		var pre = $("<pre>" + thiz.html() + "</pre>");
		thiz.html("");
		pre.appendTo(thiz);
		pre.snippet(lang || "javascript", { style: "emacs", showNum: true });
	}
	
	try {
		$("code").each(one);
	} catch(e) {
		//alert("[code.js] error: " + e);
	}
}

tarsier.ready(highlight_codes);

//tarsier.importCSS("http://steamdev.com/snippet/css/jquery.snippet.min.css");
//tarsier.importJS("http://steamdev.com/snippet/js/jquery.snippet.min.js");

tarsier.importCSS("http://moky.github.io/Tarsier/3rd/jquery.snippet.min.css");
tarsier.importJS("http://moky.github.io/Tarsier/3rd/jquery.snippet.min.js");


