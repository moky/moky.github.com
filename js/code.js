;
/**
 *  Author:
 *      Moky @ Dec. 19, 2013
 */

function highlight(target) {
	try {
		target = $(target || this);
		var language = target.attr("language") || "javascript";
		var html = target.html();
		html = html.replace(/\</g, "&lt;");
		html = html.replace(/\>/g, "&gt;");
		var pre = $("<pre>" + html + "</pre>");
		target.html("");
		pre.appendTo(target);
		pre.snippet(language, { style: "dull", showNum: true });
	} catch(e) {
		tarsier.error("[code.js] error: " + e);
	}
}

if (typeof(tarsier) !== "undefined") {
	/**
	 * highlight codes when ready
	 */
	tarsier.ready(function() {
		$("code").each(highlight);
	});
}

if (typeof($.fn.snippet) === "undefined") {
	/**
	 * import <jqeury.snippet.js> for highlight codes
	 */
	if (false) {
		tarsier.importCSS("http://steamdev.com/snippet/css/jquery.snippet.min.css");
		tarsier.importJS("http://steamdev.com/snippet/js/jquery.snippet.min.js");
	} else {
		tarsier.importCSS("http://moky.github.io/Tarsier/3rd/jquery.snippet.min.css");
		tarsier.importJS("http://moky.github.io/Tarsier/3rd/jquery.snippet.min.js");
	}
}
