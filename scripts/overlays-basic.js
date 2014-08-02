overlays[overlays.length] = {
	name: "Box",
	sliders: [["Left", true], ["Top", false], ["Width", true], ["Height", false]],
	draw: function (fill, values) {
		var w = $("#flag").width();
		var h = $("#flag").height();
		
		drawThing(makeSVG("rect", {
			x: w * values[0] / maxX,
			y: h * values[1] / maxY,
			width: w * values[2] / maxX,
			height: values[3] == 0 ? w * values[2] / maxX : h * values[3] / maxY,
			fill: fill
		}));
	}
};

overlays[overlays.length] = {
	name: "Cross",
	sliders: [["Left", true], ["Top", false], ["Thickness", true]],
	draw: function (fill, values) {
		var w = $("#flag").width();
		var h = $("#flag").height();
		var t = w * values[2] / maxX;
		var x = w * values[0] / maxX - t / 2;
		var y = h * values[1] / maxY - t / 2;
		
		drawThing(makeSVG("rect", {
			width: $("#flag").width(),
			height: t,
			x: 0,
			y: y,
			fill: fill
		}));
		
		drawThing(makeSVG("rect", {
			width: t,
			height: $("#flag").height(),
			x: x,
			y: 0,
			fill: fill
		}));
	}
};

overlays[overlays.length] = {
	name: "Ellipse",
	sliders: [["Left", true], ["Top", false], ["Width", true], ["Height", false]],
	draw: function (fill, values) {
		var w = $("#flag").width() * values[2] / maxX;
		var h = values[3] == 0
			? w
			: $("#flag").height() * values[3] / maxX;
		
		var x = $("#flag").width() * values[0] / maxX;
		var y = $("#flag").height() * values[1] / maxY;
		
		drawThing(makeSVG("ellipse", {
			rx: w,
			ry: h,
			cx: x,
			cy: y,
			fill: fill
		}));
	}
};

overlays[overlays.length] = {
	name: "Half saltire",
	sliders: [["Thickness", true]],
	draw: function (fill, values) {
		var width = $("#flag").width();
		var height = $("#flag").height();
		var wX = width * values[0] / maxX / 4;
		var wY = height * values[0] / maxX / 4;
		var centerX = width / 2;
		var centerY = height / 2;
		
		// " + x + "
		
		drawThing(makeSVG("polygon", {
			points: "0,0 " + centerX + "," + centerY + " " + (centerX - wX) + "," + centerY + " 0," + wY,
			fill: fill
		}));
		
		drawThing(makeSVG("polygon", {
			points: centerX + "," + centerY + " " + centerX + "," + (centerY - wY) + " " + (width - wX) + ",0 " + width + ",0",
			fill: fill
		}));
		
		drawThing(makeSVG("polygon", {
			points: centerX + "," + centerY + " " + centerX + "," + (centerY + wY) + " " + wX + "," + height + " 0," + height,
			fill: fill
		}));
		
		drawThing(makeSVG("polygon", {
			points: centerX + "," + centerY + " " + (centerX + wX) + "," + centerY + " " + width + "," + (height - wY) + " " + width + "," + height,
			fill: fill
		}));
		
		//drawThing(makeSVG("polygon", {
		//	points: (width - wX) + ",0 " + width + ",0 " + width + "," + wY + " " + wX + "," + height + " 0," + height + " 0," + (height - wY) + " " + (width - wX) + ",0",
		//	fill: fill
		//}));
	}
};

overlays[overlays.length] = {
	name: "Saltire",
	sliders: [["Thickness", true]],
	draw: function (fill, values) {
		var width = $("#flag").width();
		var height = $("#flag").height();
		var wX = width * values[0] / maxX / 2;
		var wY = height * values[0] / maxX / 2;
		
		drawThing(makeSVG("polygon", {
			points: wX + ",0 0,0 0," + wY + " " + (width - wX) + "," + height + " " + width + "," + height + " " + width + "," + (height - wY) + " " + wX + ",0",
			fill: fill
		}));
		
		drawThing(makeSVG("polygon", {
			points: (width - wX) + ",0 " + width + ",0 " + width + "," + wY + " " + wX + "," + height + " 0," + height + " 0," + (height - wY) + " " + (width - wX) + ",0",
			fill: fill
		}));
	}
};
