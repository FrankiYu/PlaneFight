window.onload = function() {
	    window.onresize = function() {
        	location.reload(true);
    	}
	var zr;
	var animationTicket;
	if (window.innerWidth) winWidth = window.innerWidth;
	else if ((document.body) && (document.body.clientWidth)) winWidth = document.body.clientWidth;
	if (window.innerHeight) winHeight = window.innerHeight;
	else if ((document.body) && (document.body.clientHeight)) winHeight = document.body.clientHeight;
	if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
		winHeight = document.documentElement.clientHeight;
		winWidth = document.documentElement.clientWidth;
		var faceId = document.getElementById('face');
		faceId.style.height = winHeight + 'px';
		faceId.style.background = '#181818'
	}
	require.config({
		packages: [{
			name: 'zrender',
			location: 'src',
			main: 'zrender'
		}]
	});
	require(['zrender'],
	function(zrender) {
		var zr = zrender.init(document.getElementById('face'));
		var zrColor = require('zrender/tool/color');
		var colorIdx = 0;
		var width = Math.ceil(zr.getWidth());
		var height = Math.ceil(zr.getHeight());
		var i;
		var n = 50;
		var shapeList = [];
		var pos;
		var len;
		var xStart;
		for (i = 0; i < n; i++) {
			xStart = -Math.ceil(Math.random() * 1000);
			len = Math.ceil(Math.random() * 400);
			pos = Math.ceil(Math.random() * height);
			shapeList[i] = {
				shape: 'line',
				id: zr.newShapeId(),
				style: {
					xStart: xStart,
					yStart: pos,
					xEnd: xStart + len,
					yEnd: pos,
					strokeColor: zrColor.random(),
					lineWidth: 1
				},
				_animationX: Math.ceil(Math.random() * 100),
				_len: len,
				hoverable: false
			};
			zr.addShape(shapeList[i])
		}
		var aniText = {
			shape: 'text',
			id: zr.newShapeId(),
			style: {
				x: width / 2,
				y: height / 2 - 90,
				brushType: 'stroke',
				strokeColor: 'rgba(255, 255, 255, 0.2)',
				lineWidth: 1,
				text: 'Franki Yu',
				textFont: 'bold 60px verdana',
				textAlign: 'center'
			},
			_animationSize: 60,
			hoverable: false
		};
		zr.addShape(aniText);

		zr.addShape({
			shape: 'image',
			style: {
				x: width / 2 - 45,
				y: height / 2 - 230,
				image: "avatar.png",
				width: 90,
				height: 90,
				color: 'rgba(135, 206, 250, 0.8)',
				text: '',
				textColor: 'red'
			},
			clickable: true,
			onclick: function() {
				window.location = 'http://126.am/franki'
			}
		});
		zr.addShape({
			shape: 'text',
			zlevel: 1,
			style: {
				x: width / 2,
				y: height / 2 - 80,
				brushType: 'both',
				color: zrColor.getLinearGradient(0, 70, 0, 110, [[0, '#c7ffbb'], [1, '#00afdd']]),
				strokeColor: '#ffff77',
				lineWidth: 2,
				shadowBlur: 15,
				shadowColor: 'rgba(255,215,0,0.8)',
				text: '飞机大战',
				textFont: 'bold 80px "Times New Roman"',
				textAlign: 'center'
			},
			draggable: true
		});
		zr.addShape({
		    shape : 'rectangle',
		    style : {
		        x : width / 2 - 50,
		        y : height / 2 + 20,
		        width : 100,
		        height : 50,
		        color : 'rgba(135, 206, 250, 0.8)',
		        text:'开始游戏',
		        textFont: 'bold 14px "Times New Roman"',
				textAlign: 'center',
		        textPosition:'inside'
		    },
			clickable: true,
			onclick: function() {
				$("#face").css("display","none");
			}
		});
		zr.render(function() {
			animationTicket = setInterval(function() {
				var style;
				for (i = 0; i < n; i++) {
					style = shapeList[i].style;
					if (style.xStart >= width) {
						shapeList[i]._len = Math.ceil(Math.random() * 400);
						shapeList[i].style.xStart = -400;
						shapeList[i].style.xEnd = -400 + shapeList[i]._len;
						shapeList[i].style.yStart = Math.ceil(Math.random() * height);
						shapeList[i].style.yEnd = shapeList[i].style.yStart
					}
					shapeList[i].style.xStart += shapeList[i]._animationX;
					shapeList[i].style.xEnd += shapeList[i]._animationX;
					zr.modShape(shapeList[i].id, shapeList[i])
				}
				aniText._animationSize += Math.round(2000 / aniText._animationSize);
				if (aniText._animationSize > 500) {
					aniText._animationSize = 60
				}
				aniText.style.textFont = 'bold ' + aniText._animationSize + 'px verdana';
				zr.modShape(aniText.id, aniText);
				zr.refresh()
			},
			50)
		})
	})
}