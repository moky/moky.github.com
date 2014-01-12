;
/**
 *  Author:
 *      Moky @ Jan. 10, 2014
 */

function utf16to8(str) {
	var out, i, len, c;
	out = "";
	len = str.length;
	for(i = 0; i < len; i++) {
		c = str.charCodeAt(i);
		if ((c >= 0x0001) && (c <= 0x007F)) {
			out += str.charAt(i);
		} else if (c > 0x07FF) {
			out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
			out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
			out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
		} else {
			out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
			out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
		}
	}
	return out;
}

function qrcode(options) {
	// if options is string,
	if (typeof(options) === "string") {
		options	= { text: options, target: "#qrcode" };
	}
	// support UTF-8
	options.text = utf16to8(options.text);
	
	$("<div style=\"display:inline-block;margin:8px;\"></div>")
	.qrcode(options)
	.appendTo(options.target);
}

//tarsier.importJS("http://jeromeetienne.github.io/jquery-qrcode/jquery.qrcode.min.js");

tarsier.importJS("http://moky.github.io/Tarsier/3rd/jquery.qrcode.min.js");


