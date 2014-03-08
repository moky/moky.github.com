
!function (sf) {
	'use strict';
	var cc = sf.cc;
	var cn = sf.cn;
	
	// just for test
	var draw = cc.Sprite.prototype.draw;
	
	cc.Sprite.prototype.draw = function() {
		draw.apply(this, arguments);
		
		// draw bounding box
		var locQuad = this._quad;
		var verticesG1 = [
						  cc.p(locQuad.tl.vertices.x, locQuad.tl.vertices.y),
						  cc.p(locQuad.bl.vertices.x, locQuad.bl.vertices.y),
						  cc.p(locQuad.br.vertices.x, locQuad.br.vertices.y),
						  cc.p(locQuad.tr.vertices.x, locQuad.tr.vertices.y)
						  ];
		cc.drawingUtil.drawPoly(verticesG1, 4, true);
		
		// draw anchor point
		var point = this._anchorPointInPoints;
		var L = 4;
		cc.drawingUtil.drawLine(cc.p(point.x - L, point.y), cc.p(point.x + L, point.y));
		cc.drawingUtil.drawLine(cc.p(point.x, point.y - L), cc.p(point.x, point.y + L));
	};
	
}(SpriteForest);
