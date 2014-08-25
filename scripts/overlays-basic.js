function loadOverlaysBasic() {
	overlays[overlays.length] = {
		name: "Border",
		sliders: [["Thickness", true, 1]],
		draw: function (fill, values) {
			var w = $("#flag").width();
			var h = $("#flag").height();
			
			var thickness = w * values[0] / maxX / 2;

			// Prevent the border from overlapping itself
			if (w - thickness * 2 < 0) {
				thickness = w / 2.0;
			}
			if (h - thickness * 2 < 0) {
				thickness = h / 2.0;
			}
			
			drawThing(makeSVG("path", {
				d: "M 0,0 " + w + ",0 " + w + "," + h + " 0," + h + " Z M " + thickness + "," + thickness + " " + (w - thickness) + "," + thickness + " " + (w - thickness) + "," + (h - thickness) + " " + thickness + "," + (h - thickness) + " Z",
				fill: fill,
				"fill-rule": "evenodd"
			}, null));
		}
	};
	
	overlays[overlays.length] = {
		name: "Box",
		sliders: [["Left", true, 1], ["Top", false, 1], ["Width", true, 1], ["Height", false, 1]],
		draw: function (fill, values) {
			var w = $("#flag").width();
			var h = $("#flag").height();
			
			drawThing(makeSVG("rect", {
				x: w * values[0] / maxX,
				y: h * values[1] / maxY,
				width: w * values[2] / maxX,
				height: values[3] == 0 ? w * values[2] / maxX : h * values[3] / maxY,
				fill: fill
			}, null));
		}
	};
	
	overlays[overlays.length] = {
		name: "Checkerboard",
		sliders: [["Left", true, 1], ["Top", false, 1], ["Width", true, 1], ["Height", false, 1], ["Count horizontal", true, 1], ["Count vertical", false, 1]],
		draw: function (fill, values) {
			var width = $("#flag").width();
			var height = $("#flag").height();
			var centerX = width * (values[0] / maxX);
			var centerY = height * (values[1] / maxY);
			var thisWidth = width * (values[2] / maxX);
			var thisHeight = height * (values[3] / maxY);
			if (thisHeight == 0) thisHeight = thisWidth;

			var left = centerX - thisWidth / 2;
			var top = centerY - thisHeight / 2;
			var blockWidth = thisWidth / values[4];
			var blockHeight = thisHeight / values[5];
			
			for (var x = 0; x < values[4]; x++)
			{
				for (var y = 0; y < values[5]; y++)
				{
					if ((x + y) % 2 == 0)
					{
						drawThing(makeSVG("rect", {
							x: left + x * blockWidth,
							y: top + y * blockHeight,
							width: blockWidth,
							height: blockHeight,
							fill: fill
						}, null));
					}
				}
			}
		}
	};

	overlays[overlays.length] = {
		name: "Cross",
		sliders: [["Left", true, 1], ["Top", false, 1], ["Thickness", true, 1]],
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
			}, null));
			
			drawThing(makeSVG("rect", {
				width: t,
				height: $("#flag").height(),
				x: x,
				y: 0,
				fill: fill
			}, null));
		}
	};

	overlays[overlays.length] = {
		name: "Diamond",
		sliders: [["Left", true, 1], ["Top", false, 1], ["Width", true, 1], ["Height", false, 1]],
		draw: function (fill, values) {
			var w = $("#flag").width() * (values[2] / maxX);
			var h = values[3] == 0
					? w
					: $("#flag").height() * (values[3] / maxY);

			var x = $("#flag").width() * (values[0] / maxX);
			var y = $("#flag").height() * (values[1] / maxY);
			
			drawThing(makeSVG("polygon", {
				points: x + "," + (y - h/2) + " " + (x + w/2) + "," + y + " " + x + "," + (y + h/2) + " " + (x - w/2) + "," + y,
				fill: fill
			}, null));
		}
	};

	overlays[overlays.length] = {
		name: "Ellipse",
		sliders: [["Left", true, 1], ["Top", false, 1], ["Width", true, 1], ["Height", false, 1]],
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
			}, null));
		}
	};
	
	overlays[overlays.length] = {
		name: "Fimbriation backward",
		sliders: [["Thickness", true, 1]],
		draw: function (fill, values) {
			var width = $("#flag").width();
			var height = $("#flag").height();
			var wX = width * values[0] / maxX / 2;
			var wY = height * values[0] / maxX / 2;
			
			drawThing(makeSVG("polygon", {
				points: wX + ",0 0,0 0," + wY + " " + (width - wX) + "," + height + " " + width + "," + height + " " + width + "," + (height - wY) + " " + wX + ",0",
				fill: fill
			}, null));
		}
	};
	
	overlays[overlays.length] = {
		name: "Fimbriation forward",
		sliders: [["Thickness", true, 1]],
		draw: function (fill, values) {
			var width = $("#flag").width();
			var height = $("#flag").height();
			var wX = width * values[0] / maxX / 2;
			var wY = height * values[0] / maxX / 2;
			
			drawThing(makeSVG("polygon", {
				points: (width - wX) + ",0 " + width + ",0 " + width + "," + wY + " " + wX + "," + height + " 0," + height + " 0," + (height - wY) + " " + (width - wX) + ",0",
				fill: fill
			}, null));
		}
	};
	
	overlays[overlays.length] = {
		name: "Half ellipse",
		sliders: [["Left", true, 1], ["Top", false, 1], ["Width", true, 1], ["Height", false, 1], ["Rotation", true, 0]],
		draw: function (fill, values) {
			var width = $("#flag").width();
			var height = $("#flag").height();
			
			var x = width * values[0] / maxX;
			var y = height * values[1] / maxY;
			var radX = width * (values[2] / maxX) / 2;
			var radY = values[3] == 0
						? radX
						: height * values[3] / maxY

			var angle = 2 * Math.PI * values[4] / maxX;
			var xOffset = radX - radX * Math.cos(angle);
			var yOffset = radX * Math.sin(angle);

			var x1 = x - radX + xOffset;
			var x2 = x + radX - xOffset;
			var y1 = y - yOffset;
			var y2 = y + yOffset;

			drawThing(makeSVG("path", {
				d: "M " + x1 + "," + y1 + " A " + radX + "," + radY + " " + (angle*180/Math.PI) + " 1,1 " + x2 + "," + y2 + " z",
				fill: fill
			}, null));
		}
	};

	overlays[overlays.length] = {
		name: "Half saltire",
		sliders: [["Thickness", true, 1]],
		draw: function (fill, values) {
			var width = $("#flag").width();
			var height = $("#flag").height();
			var wX = width * values[0] / maxX / 4;
			var wY = height * values[0] / maxX / 4;
			var centerX = width / 2;
			var centerY = height / 2;
			
			drawThing(makeSVG("polygon", {
				points: "0,0 " + centerX + "," + centerY + " " + (centerX - wX) + "," + centerY + " 0," + wY,
				fill: fill
			}, null));
			
			drawThing(makeSVG("polygon", {
				points: centerX + "," + centerY + " " + centerX + "," + (centerY - wY) + " " + (width - wX) + ",0 " + width + ",0",
				fill: fill
			}, null));
			
			drawThing(makeSVG("polygon", {
				points: centerX + "," + centerY + " " + centerX + "," + (centerY + wY) + " " + wX + "," + height + " 0," + height,
				fill: fill
			}, null));
			
			drawThing(makeSVG("polygon", {
				points: centerX + "," + centerY + " " + (centerX + wX) + "," + centerY + " " + width + "," + (height - wY) + " " + width + "," + height,
				fill: fill
			}, null));
		}
	};

	overlays[overlays.length] = {
		name: "Line",
		sliders: [["X1", true, 1], ["Y1", false, 1], ["X2", true, 2], ["Y2", true, 2], ["Thickness", true, 1]],
		draw: function (fill, values) {
			var width = $("#flag").width();
			var height = $("#flag").height();
			
			drawThing(makeSVG("line", {
				x1: width * values[0] / maxX,
				y1: height * values[1] / maxY,
				x2: width * values[2] / maxX,
				y2: height * values[3] / maxY,
				stroke: fill,
				"stroke-width": width * values[4] / maxX
			}, null));
		}
	};

	overlays[overlays.length] = {
		name: "Line horizontal",
		sliders: [["Y", false, 1], ["Thickness", true, 1]],
		draw: function (fill, values) {
			var width = $("#flag").width();
			var height = $("#flag").height();
			var y = height * values[0] / maxY;
			var thick = width * values[1] / maxX;
			
			drawThing(makeSVG("line", {
				x1: 0,
				y1: y,
				x2: width,
				y2: y,
				stroke: fill,
				"stroke-width": thick
			}, null));
		}
	};

	overlays[overlays.length] = {
		name: "Line vertical",
		sliders: [["X", true, 1], ["Thickness", true, 1]],
		draw: function (fill, values) {
			var width = $("#flag").width();
			var height = $("#flag").height();
			var x = width * values[0] / maxX;
			var thick = width * values[1] / maxX;
			
			drawThing(makeSVG("line", {
				x1: x,
				y1: 0,
				x2: x,
				y2: height,
				stroke: fill,
				"stroke-width": thick
			}, null));
		}
	};

	overlays[overlays.length] = {
		name: "Pall",
		sliders: [["X", true, 1], ["Thickness", true, 1]],
		draw: function (fill, values) {
			var width = $("#flag").width();
			var height = $("#flag").height();
			var x = width * values[0] / maxX;
			var w = width * values[1] / maxX / 2;
			
			drawThing(makeSVG("polygon", {
				points: "0,0 " + (w / 2) + ",0 " + (x + w / 3) + "," + (height / 2 - w / 3) + " " + width + "," + (height / 2 - w / 3) + " " + width + "," + (height / 2 + w / 3) + " " + (x + w / 3) + "," + (height / 2 + w / 3) + " " + (w / 2) + "," + height + " 0," + height + " 0," + (height - w / 2) + " " + (x - w / 3) + "," + (height / 2) + " 0," + (w / 2),
				fill: fill
			}, null));
		}
	};

	overlays[overlays.length] = {
		name: "Quadrilateral",
		sliders: [["X1", true, 1], ["Y1", false, 1], ["X2", true, 2], ["Y2", false, 1], ["X3", true, 3], ["Y3", false, 2], ["X4", true, 2], ["Y4", false, 2]],
		draw: function (fill, values) {
			var width = $("#flag").width();
			var height = $("#flag").height();
			var x1 = width * (values[0] / maxX);
			var y1 = height * (values[1] / maxY);
			var x2 = width * (values[2] / maxX);
			var y2 = height * (values[3] / maxY);
			var x3 = width * (values[4] / maxX);
			var y3 = height * (values[5] / maxY);
			var x4 = width * (values[6] / maxX);
			var y4 = height * (values[7] / maxY);
			
			drawThing(makeSVG("polygon", {
				points: x1 + "," + y1 + " " + x2 + "," + y2 + " " + x3 + "," + y3 + " " + x4 + "," + y4,
				fill: fill
			}, null));
		}
	};

	overlays[overlays.length] = {
		name: "Rays",
		sliders: [["Left", true, 1], ["Top", false, 1], ["Count", true, 5]],
		draw: function (fill, values) {
			// Get path data
			var width = $("#flag").width();
			var height = $("#flag").height();
			var paths = [];
			var centerX = width * (values[0] / maxX);
			var centerY = height * (values[1] / maxY);
			var count = values[2];
			var angularInterval = Math.PI / count;
			
			for (var i = 0; i < count; i++)
			{
				var point1 = borderIntersection(centerX, centerY, angularInterval * 2 * i, width, height);
				var point2 = borderIntersection(centerX, centerY, angularInterval * (2 * i + 1), width, height);

				// If points lie on different sides, add corner
				var point3 = "";
				if (point1.x != point2.x && point1.y != point2.y)
				{
					if (point1.y == 0)
					{
						point3 = "0,0 ";
					}
					else if (point1.x == 0)
					{
						point3 = "0," + height + " ";
					}
					else if (point1.y == height)
					{
						point3 = width + "," + height + " ";
					}
					else if (point1.x == width)
					{
						point3 = width + ",0 ";
					}
				}

				paths[paths.length] = "M " + centerX + "," + centerY + " " + point1.x + "," + point1.y + " " + point3 + "" + point2.x + "," + point2.y + " Z";
			}
			
			for (var i = 0; i < paths.length; i++) {
				drawThing(makeSVG("path", {
					d: paths[i],
					fill: fill
				}, null));
			}
		}
	};

	overlays[overlays.length] = {
		name: "Ring",
		sliders: [["Left", true, 1], ["Top", false, 1], ["Width", true, 1], ["Height", false, 1], ["Size", true, 1]],
		draw: function (fill, values) {
			var width = $("#flag").width();
			var height = $("#flag").height();
			var x = width * values[0] / maxX;
			var y = height * values[1] / maxY;

			var outerRadX = width * values[2] / maxX / 2;
			var outerRadY = values[3] == 0
				? outerRadX
				: height * values[3] / maxY / 2;

			var proportion = values[4] / maxX;
			var innerRadX = outerRadX * proportion;
			var innerRadY = outerRadY * proportion;
			
			drawThing(makeSVG("path", {
				d: "M " + x + "," + y + " m -" + outerRadX + ",0 a " + outerRadX + "," + outerRadY + " 0 1,0 " + (2 * outerRadX) + ",0 a " + outerRadX + "," + outerRadY + " 0 1,0 -" + (2 * outerRadX) + ",0 z " +
				   "M " + x + "," + y + " m " + innerRadX + ",0 a " + innerRadX + "," + innerRadY + " 0 0,1 -" + (2 * innerRadX) + ",0 a " + innerRadX + "," + innerRadY + " 0 1,1 " + (2 * innerRadX) + ",0 z",
				fill: fill
			}, null));
		}
	};

	overlays[overlays.length] = {
		name: "Saltire",
		sliders: [["Thickness", true, 1]],
		draw: function (fill, values) {
			var width = $("#flag").width();
			var height = $("#flag").height();
			var wX = width * values[0] / maxX / 2;
			var wY = height * values[0] / maxX / 2;
			
			drawThing(makeSVG("polygon", {
				points: wX + ",0 0,0 0," + wY + " " + (width - wX) + "," + height + " " + width + "," + height + " " + width + "," + (height - wY) + " " + wX + ",0",
				fill: fill
			}, null));
			
			drawThing(makeSVG("polygon", {
				points: (width - wX) + ",0 " + width + ",0 " + width + "," + wY + " " + wX + "," + height + " 0," + height + " 0," + (height - wY) + " " + (width - wX) + ",0",
				fill: fill
			}, null));
		}
	};

	overlays[overlays.length] = {
		name: "Triangle",
		sliders: [["X1", true, 1], ["Y1", false, 1], ["X2", true, 2], ["Y2", false, 1], ["X3", true, 3], ["Y3", false, 2]],
		draw: function (fill, values) {
			var width = $("#flag").width();
			var height = $("#flag").height();
			var x1 = width * (values[0] / maxX);
			var y1 = height * (values[1] / maxY);
			var x2 = width * (values[2] / maxX);
			var y2 = height * (values[3] / maxY);
			var x3 = width * (values[4] / maxX);
			var y3 = height * (values[5] / maxY);
			
			drawThing(makeSVG("polygon", {
				points: x1 + "," + y1 + " " + x2 + "," + y2 + " " + x3 + "," + y3,
				fill: fill
			}, null));
		}
	};
}

function borderIntersection(centerX, centerY, angle, width, height) {
	var possiblePoints = [];

	if (angle > 0 && angle < Math.PI)
	{
		// Check intersection with top border
		var tX = centerY / Math.tan(angle);
		possiblePoints[possiblePoints.length] = { x: centerX + tX, y: 0, dist: distance(tX, 0, 0, centerY) };
	}
	if (angle > Math.PI / 2 && angle < 3 * Math.PI / 2)
	{
		// Check intersection with left border
		var tY = centerX * Math.tan(2 * Math.PI - angle);
		possiblePoints[possiblePoints.length] = { x: 0, y: centerY - tY, dist: distance(0, -tY, centerX, 0) };
	}
	if (angle > Math.PI && angle < 2 * Math.PI)
	{
		// Check intersection with bottom border
		var tX = Math.tan(3 * Math.PI / 2 - angle) * (height - centerY);
		possiblePoints[possiblePoints.length] = { x: centerX - tX, y: height, dist: distance(-tX, height, 0, centerY) };
	}
	if (angle < Math.PI / 2)
	{
		// Check intersection with right border - above 0 degrees
		var tY = Math.tan(angle) * (width - centerX);
		possiblePoints[possiblePoints.length] = { x: width, y: centerY - tY, dist: distance(width, -tY, centerX, 0) };
	}
	if (angle > 3 * Math.PI / 2)
	{
		// Check intersection with right border - below 180 degrees
		var tY = Math.tan(2 * Math.PI - angle) * (width - centerX);
		possiblePoints[possiblePoints.length] = { x: width, y: centerY + tY, dist: distance(width, tY, centerX, 0) };
	}

	if (possiblePoints.length == 0) {
		return { x: centerX, y: centerY };
	}
	
	var maxDistPoint = { x: 0, y: 0, dist: 0 };
	for (var i = 0; i < possiblePoints.length; i++) {
		if (possiblePoints[i].dist > maxDistPoint.dist) {
			maxDistPoint = possiblePoints[i];
		}
	}
	
	return maxDistPoint;
}

function distance(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
}
