;
/**
 *  Author:
 *      Moky @ Jan. 10, 2014
 */

function canvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("png");
	return image;
}

function expandCanvas(canvas, border) {
	if (border < 1) {
		return canvas;
	}
	
	var image = canvasToImage(canvas);
	var nwidth = canvas.width + border + border;
	var nheight = canvas.height + border + border;
	
//	canvas = document.createElement("canvas");
	canvas.width = nwidth;
	canvas.height = nheight;
	
	var context = canvas.getContext("2d");
	context.fillStyle="#ffffff";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	// draw image again
	context.drawImage(image, border, border, image.width, image.height);
	return canvas;
}

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
		$(div).appendTo(options.target || "#qrcode");
		return;
	}
	
	// expand canvas border
	if (options.border) {
		canvas = expandCanvas(canvas, options.border);
	}
	// build image from canvas data
	var image = canvasToImage(canvas);
	// show image
	$(image).appendTo(options.target || "#qrcode");
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
