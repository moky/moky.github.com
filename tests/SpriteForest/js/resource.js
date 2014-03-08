//
// ebook resources
//

var ebook = {
	size: cc.size(1024, 768),
	
	entrance: 'res/TheCraftyWolf/TheCraftyWolf.plist',
	
	root: 'res/TheCraftyWolf/',
	
	files: [
		'Page1_default.plist',
//		'Page1_default.png',
		'Page2_default.plist',
//		'Page2_default.png',
		'Page3_default.plist',
//		'Page3_default.png',
		'Page4_default.plist',
//		'Page4_default.png',
		'Page5_default.plist',
//		'Page5_default.png',
		'Page6_default.plist',
//		'Page6_default.png',
		'Page7_default.plist',
//		'Page7_default.png',
		'TheCraftyWolf.plist',
		'TheCraftyWolf_Back.plist',
		'TheCraftyWolf_Cover.plist',
		'TheCraftyWolf_Page1.plist',
		'TheCraftyWolf_Page2.plist',
		'TheCraftyWolf_Page3.plist',
		'TheCraftyWolf_Page4.plist',
		'TheCraftyWolf_Page5.plist',
		'TheCraftyWolf_Page51.plist',
		'TheCraftyWolf_Page6.plist',
		'TheCraftyWolf_Page7.plist',
//		'back.png',
//		'bg_1.png',
//		'bg_1_1.png',
//		'bg_2.png',
//		'bg_2_1.png',
//		'bg_3.png',
//		'bg_4.png',
//		'bg_5.png',
//		'bg_6.png',
//		'bg_7.png',
//		'cover.png',
////		'jiaohuadehuli-daoyu.mp3',
////		'page.mp3',
////		'page1.mp3',
////		'page2.mp3',
////		'page3.mp3',
////		'page4.mp3',
////		'page5.mp3',
////		'page6.mp3',
////		'page7.mp3',
//		'word_5.png',
//		'xing_1.png',
//		'xing_2.png',
		],
	
	getFiles: function() {
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
};

var g_resources = ebook;
