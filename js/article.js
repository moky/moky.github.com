
function load_qzone() {
	
	qzone().templates(boot.base + "widgets/qzone-categories.html",
					  boot.base + "widgets/qzone-articles.html").apply("#qzone");
	
}

function show_page_qrcode() {
	try {
		var text = document.location.href;
		var border = 4;
		
		var div = $("#page_qrcode");
		var size = div.width() - border - border;
		
		if (size >= 64) {
			// clear content
			div.html("");
			// draw qrcode
			qrcode({target: div, text: text, width: size, height: size, border: border});
			// show
			div.css("display", "inline-block");
		}
	} catch(e) {
		tarsier.error(e);
		div.remove();
	}
}

function apply_template(data, url) {
	
	// apply template
	var template = new tarsier.Template(data, url);
	template.apply(document);
	
	// load articles widget
	widget.articles("#articles",
					boot.base + "widgets/articles.html",
					boot.base + "sitemap.xml");
	
	// load qzone
	setTimeout(load_qzone, 5000); // delay 5 seconds
	
	// build page qrcode
	tarsier.ready(function() {
		setTimeout(show_page_qrcode, 3000); // delay 3 seconds
	});
	tarsier.importJS(boot.base + "js/qrcode.js");
	
	// copyright
	copyright("#copyright");
}

//------ main
function main() {
	try {
		
		// load template
		tarsier.HTTP.ajax({
						  url: "../templates/article.html",
						  dataType: "html",
						  //cache: false,
						  success: function(data) { apply_template(data, this.url); },
						  error: function() { alert("Error loading template: " + url); }
		});
		
	} catch(e) {
		//alert("article.js: " + e);
	}
}

tarsier.importJS(boot.base + "js/widget.js");
tarsier.importJS(boot.base + "js/qzone.js");
tarsier.ready(main);
