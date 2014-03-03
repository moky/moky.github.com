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
	if (!div) {
		target.log("there is no place to show comments");
		return;
	}
	
	div.className = "ds-thread";
	
	var url = "http://static.duoshuo.com/embed.js";
	
	var cls = function() {
		div.innerHTML = "";
	};
	
	tarsier.base.import({ src: url, type: "text/javascript", async: true, callback: cls });
}

tarsier.ready(function() {
	load_comments("comments");
});
