function drawGrid(x, y) {
	var x = $("#div1val").val();
	var y = $("#div2val").val();
	var h = $("#flag").height() / y;
	var w = $("#flag").width() / x;

	drawThing(makeSVG("rect", {
		width: $("#flag").width(),
		height: $("#flag").height(),
		x: 0,
		y: 0,
		fill: $("#div1col").val()
	}));
	
	var color = $("#div2col").val();
	for (var i = 0; i < x; i++) {
		for (var j = 0; j < y; j++) {
			if ((i + j) % 2 == 0) continue;
			drawThing(makeSVG("rect", {
				width: w,
				height: h,
				x: i*w,
				y: j*h,
				fill: color
			}));
		}
	}
}