;
/**
 *  Author:
 *      Moky @ Dec. 24, 2013
 */

var widget = {
	
	// articles widget
	articles: function(target, template, dataSource) {
		var widget = new tarsier.Widget(target);
		widget.show = function() {
			if (this.template == null || this.data == null || this.target == null) return;
			$(this.target).html("");
			var name = this.target;
			$.template(name, this.template);
			$.tmpl(name, this.data.url).appendTo(this.target);
		};
		widget.query(template, dataSource);
	}
	
};
