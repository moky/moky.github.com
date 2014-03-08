
//
// application configuration
//

var g_config = {
	COCOS2D_DEBUG: 2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
	box2d: false,
	chipmunk: false,
	showFPS: true,
	frameRate: 60,
	loadExtension: false,
	renderMode: 0, //Choose of RenderMode: 0(default), 1(Canvas only), 2(WebGL only)
	tag: 'gameCanvas', //the dom element to run cocos2d on
};

//
// create the book
//
var myApp = new app.Book(g_config, g_resources);
