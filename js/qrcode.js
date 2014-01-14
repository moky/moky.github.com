;
/**
 *  Author:
 *      Moky @ Jan. 10, 2014
 */

function qrcode(options) {
	// if options is string,
	if (typeof(options) === "string") {
		options	= { text: options };
	}
	
	// support chinese chars
	var string = new tarsier.String(options.text);
	options.text = string.convertTo("utf-8");
	
	var target = options.target || "#qrcode";
	$(target).qrcode(options);
}

if (typeof($.fn.qrcode) === "undefined") {
	/**
	 *  import <jquery.qrcode.js>
	 */
	if (false) {
		tarsier.importJS("http://jeromeetienne.github.io/jquery-qrcode/jquery.qrcode.min.js");
	} else {
		tarsier.importJS("http://moky.github.io/Tarsier/3rd/jquery.qrcode.min.js");
	}
}
