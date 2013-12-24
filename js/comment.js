;
/**
 *  Author:
 *      Moky @ Dec. 23, 2013
 */

var duoshuoQuery = {
	short_name: "moky"
};

function load_comments(target) {
	
	var div = document.getElementById(target);
	if (div) {
		div.className = "ds-thread";
		tarsier.base.import({src: "http://static.duoshuo.com/embed.js",
							type: "text/javascript",
							async: true,
							callback: function() { div.innerHTML = ""; }
							});
	}
	
}

tarsier.ready(function() {
	load_comments("comments");
});
