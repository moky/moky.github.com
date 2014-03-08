
var app = app || {};

!function(ns) {
	
	function Book(config, resource) {
		this._super();
		
		this._config = config;
		this._resource = resource;
		
		cc.COCOS2D_DEBUG = config['COCOS2D_DEBUG'];
		cc.initDebugSetting();
		cc.setup(config['tag']);
		cc.AppController.shareAppController().didFinishLaunchingWithOptions();
	}
	
	function applicationDidFinishLaunching() {
		if (cc.RenderDoesnotSupport()) {
			//show Information to user
			alert("Browser doesn't support WebGL");
			return false;
		}
		
		var config = this._config;
		var resource = this._resource;
		var size = resource['size'];
		
		cc.EGLView.getInstance().resizeWithBrowserSize(true);
		cc.EGLView.getInstance().setDesignResolutionSize(size.width, size.height, cc.RESOLUTION_POLICY.SHOW_ALL);
		
		// initialize director
		var director = cc.Director.getInstance();
		
		// turn on display FPS
		director.setDisplayStats(config['showFPS']);
		
		// set FPS. the default value is 1.0/60 if you don't call this
		director.setAnimationInterval(1.0 / config['frameRate']);
		
		//load resources
		cc.LoaderScene.preload(resource.getFiles(), function() {
			SpriteForest.Lord.getInstance().runIntoForest(resource.entrance);
		}, this);
		
		return true;
	}
	
	var prop = {
		ctor: Book,
		applicationDidFinishLaunching: applicationDidFinishLaunching,
		// properties
		_config: null,
		_resource: null,
	};
	
	ns.Book = cc.Application.extend(prop);
	
}(app);
