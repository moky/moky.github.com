
!function() {
	
	var importJS = function(url, callback) {
		
		var script = document.createElement("script");
		if (script) {
			script.type = "text/javascript";
			script.src = url;
			
			// callback
			script.onload = function() {
				try {
					if (typeof callback === 'function') {
						callback();
					}
				} catch(e) {
					alert("callback error: " + e);
				}
			}
			script.onreadystatechange = function() { // IE
				if (this.readyState === "complete") {
					script.onload();
				}
			}
			
			// load
			var heads = document.getElementsByTagName("head");
			var head = heads && heads.length > 0 ? heads[0] : document.documentElement;
			if (head) {
				head.appendChild(script);
			}
		}
		return this;
	};
	
	//
	// launch point
	//
	var startup = function() {
		
		tarsier.importJS('libs/cocos2d.min.js');
		tarsier.importJS('libs/spriteforest.min.js');
		// patches for cocos2d
		tarsier.importJS('js/patch.js');
		
		tarsier.importJS('js/myApp.js');
		tarsier.importJS('js/resource.js');
		tarsier.importJS('js/main.js');
	};
	
	//
	// application configuration
	//
	document.ccConfig = {
		COCOS2D_DEBUG: 2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
		box2d: false,
		chipmunk: false,
		showFPS: true,
		frameRate: 60,
		loadExtension: false,
		renderMode: 1, //Choose of RenderMode: 0(default), 1(Canvas only), 2(WebGL only)
		tag: 'gameCanvas', //the dom element to run cocos2d on
	};
	
	//
	// js loader
	//
	importJS('http://moky.github.io/Tarsier/base.js', startup);
	
}();
