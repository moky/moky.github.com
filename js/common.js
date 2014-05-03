;
/**
 *  Author:
 *      Moky @ Mar. 11, 2014
 */

function prepare_links() {
	
	function is_link(url) {
		if (!url) return false;
		if (url.charAt(0) == "#") return false;
		if (url.indexOf("javascript:") >= 0) return false;
		return true;
	}
	
	function process(a) {
		var href = a.attr("href");
		if (is_link(href)) {
			a.attr("title", href);
			a.attr("onclick", "javascript: document.location.href = unescape('" + escape(href) + "');");
			a.attr("href", "javascript: void(0);");
		}
	}
	
	$("a").each(function() {
		process($(this));
	});
}

//------------------------------------------------------------------------------

function year() {
	return (new Date()).getFullYear();
}

//
//  update copyright info.
//
function copyright(target) {
	var text = "&copy;" + year() + " moKy";
	if (target) {
		$(target).html(text);
	}
	return text;
}

for (var i = 0; i < 100; ++i) {
	setTimeout(prepare_links, 500 * i);
}

var $_GET = tarsier.URI.parse(document.location.href).params;
