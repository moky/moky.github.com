
//------ main
function main() {
	try {
		widget.articles("#articles", "widgets/articles.html", "sitemap.xml");
		
		tarsier.importCSS("3rd/mmenu/css/jquery.mmenu.css");
		tarsier.importJS("3rd/mmenu/js/jquery.mmenu.min.js",
						 function() {
							$("aside").mmenu();
						 });
		
		// copyright
		copyright("#copyright");
		
	} catch(e) {
		//alert("[index.js] error: " + e);
	}
}

tarsier.importJS(boot.base + "js/widget.js");
tarsier.ready(main);
