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
		qzone.template.error(data);
		return;
	} else if (typeof(data.data) != "object") {
		//alert("[qzone.js] error: 111");
		return;
	}
	data = data.data;
	if (typeof(data.cateInfo) == "object" && typeof(data.list) == "undefined") {
		qzone.template.categories(data.cateInfo.categoryList);
	} else if (typeof(data.cateInfo) == "undefined") {
		qzone.template.articles(data.list);
	} else {
		//alert("[qzone.js] error: 222");
	}
}

//------------------------------------------------------------------------------

var _sharedQzoneManager = null;

function qzone(uin) {
	if (_sharedQzoneManager == null) {
		_sharedQzoneManager = new qzone.Manager();
	}
	if (uin) _sharedQzoneManager.uin = uin;
	return _sharedQzoneManager;
}

qzone.domains = {
	"1292823": "moky.qzone.qq.com"
};

//
// class qzone::Manager
//
qzone.Manager = function() {
	// user info
	this.uin = "1292823";
	this.url = "http://b1.qzone.qq.com/cgi-bin/blognew/get_abs";
	// templages
	this.categories = null;
	this.articles = null;
	
	// queries
	this.queries = [];
	return this;
};

qzone.Manager.prototype.getCatUrl = function() {
	return this.url + "?blogType=0&reqInfo=18&hostUin=" + this.uin;
};

qzone.Manager.prototype.getArticlesUrl = function(cat, hex) {
	return this.url + "?blogType=0&reqInfo=1&hostUin=" + this.uin + "&num=100&cateName=" + cat + "&cateHex=" + hex;
};

qzone.Manager.prototype.templates = function(categories, articles) {
	if (categories) this.categories = categories;
	if (articles) this.articles = articles;
	return this;
};

qzone.Manager.prototype.add = function(url) {
	this.queries.push(url);
};

qzone.Manager.prototype.run = function() {
	var url = this.queries.shift();
	if (!url) return;
		
	tarsier.base.import({
						src: url,
						type: "text/javascript",
						async: true,
						callback: function() {
							setTimeout(qzone.delay, 1000); // query next url
						}
	});
};

qzone.Manager.prototype.apply = function(target) {
	if (target) this.target = target;
	this.add(this.getCatUrl());
	setTimeout(qzone.delay, 1000); // query first url
	return this;
};

qzone.delay = function() {
	qzone().run();
}

//
// namespace qzone::template
//
qzone.template = {
	
	// show categories
	categories: function(data) {
		if (data == null || data.length == 0) return;
		var qz = qzone();
		// process template
		var template = qz.categories;
		var target = qz.target;
		var widget = new tarsier.Widget(target);
		if (widget) {
			widget.setData(data);
			widget.queryTemplate({url: template});
		}
		// query articles with categories
		for (var i = 0; i < data.length; ++i) {
			qz.add(qz.getArticlesUrl(data[i].category, data[i].cateHex));
		}
		setTimeout(qzone.delay, 1000);
	},
	
	// show articles
	articles: function(data) {
		if (data == null || data.length == 0) return;
		var qz = qzone();
		// blog url
		var url = "http://" + (qzone.domains[qz.uin] || "user.qzone.qq.com/" + qz.uin) + "/blog/";
		for (var i = 0; i < data.length; ++i) {
			data[i].url = url + data[i].blogId;
		}
		// process template
		var template = qz.articles;
		var target = "#" + data[0].cateHex;
		var widget = new tarsier.Widget(target);
		if (widget) {
			widget.setData(data);
			widget.queryTemplate({url: template});
		}
	},
	
	// show error
	error: function(data) {
		if (data == null) return;
		var qz = qzone();
		$(qz.target).html("<span style=\"color: red; \">[qzone] error code: " + data.code + ", message: " + data.message + "</span>");
	}
};
