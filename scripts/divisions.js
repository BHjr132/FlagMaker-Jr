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

function drawFesses() {
	var a = parseInt($("#div1val").val());
	var b = parseInt($("#div2val").val());
	var c = parseInt($("#div3val").val());
	
	var h = $("#flag").height();
	var h1 = h * (a / (a+b+c));
	var h2 = h * (b / (a+b+c));
	var h3 = h * (c / (a+b+c));
	
	drawThing(makeSVG("rect", {
		width: $("#flag").width(),
		height: h,
		x: 0,
		y: 0,
		fill: $("#div1col").val()
	}));
	
	drawThing(makeSVG("rect", {
		width: $("#flag").width(),
		height: h2 + h3,
		x: 0,
		y: h1,
		fill: $("#div2col").val()
	}));

	drawThing(makeSVG("rect", {
		width: $("#flag").width(),
		height: h3,
		x: 0,
		y: h1 + h2,
		fill: $("#div3col").val()
	}));
}

function drawPales() {
	var a = parseInt($("#div1val").val());
	var b = parseInt($("#div2val").val());
	var c = parseInt($("#div3val").val());
	
	var w = $("#flag").width();
	var w1 = w * (a / (a+b+c));
	var w2 = w * (b / (a+b+c));
	var w3 = w * (c / (a+b+c));
	
	drawThing(makeSVG("rect", {
		width: $("#flag").width(),
		height: $("#flag").height(),
		x: 0,
		y: 0,
		fill: $("#div1col").val()
	}));
	
	drawThing(makeSVG("rect", {
		width: w2 + w3,
		height: $("#flag").height(),
		x: w1,
		y: 0,
		fill: $("#div2col").val()
	}));

	drawThing(makeSVG("rect", {
		width: w3,
		height: $("#flag").height(),
		x: w1 + w2,
		y: 0,
		fill: $("#div3col").val()
	}));
}

function drawBendsF() {
	drawThing(makeSVG("rect", {
		width: $("#flag").width(),
		height: $("#flag").height(),
		x: 0,
		y: 0,
		fill: $("#div1col").val()
	}));
	
	drawThing(makeSVG("polygon", {
		points: $("#flag").width() + "," + $("#flag").height() + " " + $("#flag").width() + ",0 0," + $("#flag").height(),
		fill: $("#div2col").val()
	}));
}

function drawBendsB() {
	drawThing(makeSVG("rect", {
		width: $("#flag").width(),
		height: $("#flag").height(),
		x: 0,
		y: 0,
		fill: $("#div1col").val()
	}));
	
	drawThing(makeSVG("polygon", {
		points: "0," + $("#flag").height() + " " + "0,0 " + $("#flag").width() + "," + $("#flag").height(),
		fill: $("#div2col").val()
	}));
}

function drawX() {
	drawThing(makeSVG("rect", {
		width: $("#flag").width(),
		height: $("#flag").height(),
		x: 0,
		y: 0,
		fill: $("#div1col").val()
	}));
	
	drawThing(makeSVG("polygon", {
		points: "0,0 " + $("#flag").width() + "," + $("#flag").height() + " " + $("#flag").width() + ",0 0," + $("#flag").height(),
		fill: $("#div2col").val()
	}));
}
