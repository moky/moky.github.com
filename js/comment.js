;
/**
 *  Author:
 *      Moky @ Dec. 23, 2013
 */

var duoshuoQuery = {
	short_name: "moky"
};

(function() {
	
	var div = document.getElementById("comments");
	if (div) {
		div.className = "ds-thread";
		tarsier.base.import({src: "http://static.duoshuo.com/embed.js",
							type: "text/javascript",
							async: true,
							callback: function() { div.innerHTML = ""; }
							});
	}
	
})();
