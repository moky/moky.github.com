;
/**
 *  Author:
 *      Moky @ Dec. 18, 2013
 */

//
// qzone callback function
//
function _Callback(data) {
	if (data.code != 0) {
		alert("[qzone.js] error:" + data.message);
		return;
	} else if (typeof(data.data) != "object") {
		alert("[qzone.js] error: 111");
		return;
	}
	data = data.data;
	if (typeof(data.cateInfo) == "object" && typeof(data.list) == "undefined") {
		qzone_categories(data.cateInfo.categoryList);
	} else if (typeof(data.cateInfo) == "undefined") {
		qzone_articles(data.list);
	} else {
		alert("[qzone.js] error: 222");
	}
}

function qzone_categories(data) {
	if (data == null || data.length == 0) return;
	//
	for (var i = 0; i < data.length; ++i) {
		data[i].src = sharedQzoneManager.getArticleUrl(data[i].category, data[i].cateHex);
	}
	//
	var template = sharedQzoneManager.categories;
	var target = sharedQzoneManager.target;
	var widget = new tarsier.Widget(target);
	if (widget) {
		widget.setData(data);
		widget.queryTemplate({url: template});
	}
}

function qzone_articles(data) {
	if (data == null || data.length == 0) return;
	//
	var template = sharedQzoneManager.articles;
	var target = "#" + data[0].cateHex;
	var widget = new tarsier.Widget(target);
	if (widget) {
		widget.setData(data);
		widget.queryTemplate({url: template});
	}
}

//------------------------------------------------------------------------------

var sharedQzoneManager = null;

function qzone(args) {
	if (!sharedQzoneManager) {
		sharedQzoneManager = new qzone.Manager();
	}
	
	sharedQzoneManager.categories = args.categories;
	sharedQzoneManager.articles = args.articles;
	
	return sharedQzoneManager;
}

// class qzone::Manager
qzone.Manager = function() {
	// user info
	this.uin = "1292823";
	this.url = "http://b1.qzone.qq.com/cgi-bin/blognew/get_abs";
	
	// templages
	this.categories = null;
	this.articles = null;
}

qzone.Manager.prototype.getCatUrl = function() {
	return this.url + "?blogType=0&reqInfo=18&hostUin=" + this.uin;
}

qzone.Manager.prototype.getArticleUrl = function(cat, hex) {
	return this.url + "?blogType=0&reqInfo=1&hostUin=" + this.uin + "&num=100&cateName=" + cat + "&cateHex=" + hex;
}

qzone.Manager.prototype.apply = function(target) {
	this.target = target;
	tarsier.importJS(this.getCatUrl());
}
