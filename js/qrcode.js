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
	
	// draw qrcode on canvas
	var div = document.createElement("div");
	$(div).qrcode(options);
	
	var canvas = div.getElementsByTagName("canvas");
	if (canvas && canvas.length > 0) {
		canvas = canvas[0];
	} else {
		tarsier.error("failed to draw qrcode: " + options.text);
		return;
	}
	
	// build image from canvas data
	var image = new Image();
	image.onload = function() {
		$(image).appendTo(options.target || "#qrcode");
	}
	image.src = canvas.toDataURL("png");
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
