;
/**
 *  Author:
 *      Moky @ Jan. 10, 2014
 */

function qrcode(options) {
	$("<div style=\"display:inline-block;margin:8px;\"></div>")
	.qrcode(options)
	.appendTo(options.target);
}

//tarsier.importJS("http://jeromeetienne.github.io/jquery-qrcode/jquery.qrcode.min.js");

tarsier.importJS("http://moky.github.io/Tarsier/3rd/jquery.qrcode.min.js");


