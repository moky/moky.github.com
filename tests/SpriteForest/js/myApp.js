
var app = app || {};

//=============================================================== ebook resource

!function(ns) {
	
	function Resource(args) {
		this.size = args.size ? args.size : cc.size(1024, 768);
		this.entrance = args.entrance ? args.entrance : args.root + 'main.plist';
		this.root = args.root;
		this.files = args.files;
	}
	
	function getFiles(files, root) {
		// files
		var files = arguments.length > 0 ? files : this.files;
		if (!files) {
			return [];
		}
		
		// base dir
		var dir = arguments.length > 0 ? root : this.root;
		if (!dir) {
			return files;
		} else if (dir.charAt(dir.length - 1) != '/') {
			dir += '/';
		}
		
		// out
		var array = [];
		var len = files.length;
		for (var i = 0; i < len; ++i) {
			array.push(dir + files[i]);
		}
		return array;
	}
	
	var prop = {
		ctor: Resource,
		getFiles: getFiles,
		// properties
		size: null,
		entrance: null,
		root: null,
		files: null,
	}
	
	ns.Resource = cc.Class.extend(prop);
	
}(app);

//============================================================ ebook application

!function(ns) {
	
	function Book(resource, config) {
		this._super();
		
		// resource
		if (resource instanceof ns.Resource) {
			this._resource = resource;
		} else {
			resource = new ns.Resource(resource);
			this._resource = resource;
		}
		// ccConfig
		this._config = config ? config : document.ccConfig;
		
		cc.COCOS2D_DEBUG = config['COCOS2D_DEBUG'];
		cc.initDebugSetting();
		cc.setup(config['tag']);
		cc.AppController.shareAppController().didFinishLaunchingWithOptions();
	}
	
	function startup(path) {
		SpriteForest.Lord.getInstance().runIntoForest(path);
	}
	
	function applicationDidFinishLaunching() {
		if (cc.RenderDoesnotSupport()) {
			//show Information to user
			alert("Browser doesn't support WebGL");
			return false;
		}
		
		var config = this._config;
		var res = this._resource;
		var size = res['size'];
		
		cc.EGLView.getInstance().resizeWithBrowserSize(true);
		cc.EGLView.getInstance().setDesignResolutionSize(size.width, size.height, cc.RESOLUTION_POLICY.SHOW_ALL);
		
		// initialize director
		var director = cc.Director.getInstance();
		
		// turn on display FPS
		director.setDisplayStats(config['showFPS']);
		
		// set FPS. the default value is 1.0/60 if you don't call this
		director.setAnimationInterval(1.0 / config['frameRate']);
		
		// load resources
		cc.LoaderScene.preload(res.getFiles(), function() { startup(res.entrance); }, this);
		
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
