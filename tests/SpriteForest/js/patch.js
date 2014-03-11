
//
//  Description:
//      fix a bug that the sprites have no image will show a white face in safari (render mode: canvas only)
//
//  source file : 'cocos2d/core/sprite_nodes/CCSprite.js'
//  function    : _drawForCanvas(ctx)
//
!function (sf) {
	'use strict';
	var cc = sf.cc;
	var cn = sf.cn;
	
	// detecting
	if (cc.Browser.supportWebGL) {
		return ;
	}
	
	function draw(ctx) {
		if (!this._textureLoaded)
			return;
		
		var context = ctx || cc.renderContext;
		if (this._isLighterMode)
			context.globalCompositeOperation = 'lighter';
		
		var locEGL_ScaleX = cc.EGLView.getInstance().getScaleX(), locEGL_ScaleY = cc.EGLView.getInstance().getScaleY();
		
		context.globalAlpha = this._displayedOpacity / 255;
		var locRect = this._rect, locContentSize = this._contentSize, locOffsetPosition = this._offsetPosition, locDrawSizeCanvas = this._drawSize_Canvas;
		var flipXOffset = 0 | (locOffsetPosition._x), flipYOffset = -locOffsetPosition._y - locRect.height, locTextureCoord = this._textureRect_Canvas;
		locDrawSizeCanvas.width = locRect.width * locEGL_ScaleX;
		locDrawSizeCanvas.height = locRect.height * locEGL_ScaleY;
		
		if (this._flippedX || this._flippedY) {
			context.save();
			if (this._flippedX) {
				flipXOffset = -locOffsetPosition._x - locRect.width;
				context.scale(-1, 1);
			}
			if (this._flippedY) {
				flipYOffset = locOffsetPosition._y;
				context.scale(1, -1);
			}
		}
		
		flipXOffset *= locEGL_ScaleX;
		flipYOffset *= locEGL_ScaleY;
		
		if (this._texture && locTextureCoord.validRect) {
			var image = this._texture.getHtmlElementObj();
			if (this._colorized) {
				context.drawImage(image,
								  0, 0, locTextureCoord.width, locTextureCoord.height,
								  flipXOffset, flipYOffset, locDrawSizeCanvas.width, locDrawSizeCanvas.height);
			} else {
				context.drawImage(image,
								  locTextureCoord.x, locTextureCoord.y, locTextureCoord.width,  locTextureCoord.height,
								  flipXOffset, flipYOffset, locDrawSizeCanvas.width , locDrawSizeCanvas.height);
			}
		} else if (locContentSize._width !== 0) {
			var curColor = this.getColor();
			//-------- patch by moKy @ 2014-03-08, begin
			// old codes:
//			context.fillStyle = "rgba(" + curColor.r + "," + curColor.g + "," + curColor.b + ",1)";
//			context.fillRect(flipXOffset, flipYOffset, locContentSize._width * locEGL_ScaleX, locContentSize._height * locEGL_ScaleY);
			// new codes:
			if (curColor.r !== 255 || curColor.g !== 255 || curColor.b !== 255 || this._displayedOpacity !== 255) {
				context.fillStyle = "rgba(" + curColor.r + "," + curColor.g + "," + curColor.b + "," + this._displayedOpacity / 255 + ")";
				context.fillRect(flipXOffset, flipYOffset, locContentSize._width * locEGL_ScaleX, locContentSize._height * locEGL_ScaleY);
			}
			//-------- patch by moKy @ 2014-03-08, end
		}
		
		if (cc.SPRITE_DEBUG_DRAW === 1) {
			// draw bounding box
			context.strokeStyle = "rgba(0,255,0,1)";
			flipXOffset /= locEGL_ScaleX;
			flipYOffset /= locEGL_ScaleY;
			flipYOffset = -flipYOffset;
			var vertices1 = [cc.p(flipXOffset, flipYOffset),
							 cc.p(flipXOffset + locRect.width, flipYOffset),
							 cc.p(flipXOffset + locRect.width, flipYOffset - locRect.height),
							 cc.p(flipXOffset, flipYOffset - locRect.height)];
			cc.drawingUtil.drawPoly(vertices1, 4, true);
		} else if (cc.SPRITE_DEBUG_DRAW === 2) {
			// draw texture box
			context.strokeStyle = "rgba(0,255,0,1)";
			var drawSize = this._rect._size;
			flipYOffset = -flipYOffset;
			var vertices2 = [cc.p(flipXOffset, flipYOffset), cc.p(flipXOffset + drawSize.width, flipYOffset),
							 cc.p(flipXOffset + drawSize.width, flipYOffset - drawSize.height), cc.p(flipXOffset, flipYOffset - drawSize.height)];
			cc.drawingUtil.drawPoly(vertices2, 4, true);
		}
		if (this._flippedX || this._flippedY)
			context.restore();
		cc.g_NumberOfDraws++;
	}
	
	cc.Sprite.prototype.draw = cc.Sprite.prototype._drawForCanvas = draw;
	
}(SpriteForest);
