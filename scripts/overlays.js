var overlays = [];
var overlayId = 0;

function overlayNames() {
	var list = "";
	for (var i = 0; i < overlays.length; i++) {
		list += "<option>" + overlays[i].name + "</option>";
	}
	
	return list;
}

function addOverlay() {
	event.preventDefault();
	var overlay = overlays[0];
	
	var string = "<div id=\"overlay"+ overlayId + "\" class=\"overlay\">" +
		"<a href=\"#\" onclick=\"deleteOverlay(this);\"><img src=\"img\\remove.png\" title=\"Remove\" /></a>" +
		"<a href=\"#\" onclick=\"moveUp(this);\"><img src=\"img\\moveup.png\" title=\"Move up\" /></a>" +
		"<a href=\"#\" onclick=\"moveDown(this);\"><img src=\"img\\movedown.png\" title=\"Move down\" /></a>" +
		"<input type=\"text\" id=\"ovcol-" + overlayId + "\" />" +
		"<select id=\"type-" + overlayId + "\">" + overlayNames() + "</select>" +
		"<table>";
		
	string += getSliderString(overlay);	
	string += "</table></div>";
	
	$("#overlays").append(string);
	makePalette($("#ovcol-" + overlayId));
	
	$("#ovcol-" + overlayId).change(function() {
		draw();
	});
	
	$("#type-" + overlayId).change(function() {
		$(this).siblings("table").empty();
		var newOverlayId = document.getElementById($(this).attr("id")).selectedIndex;
		$(this).siblings("table").html(getSliderString(overlays[newOverlayId]));
		setSliderMaxes(maxX, maxY);
		draw();
	});
	
	setSliderMaxes(maxX, maxY);
	draw();
	overlayId++;
}

function getSliderString(overlay) {
	var string = "";
	for (var i = 0; i < overlay.sliders.length; i++) {
		string += "<tr><td>" + overlay.sliders[i][0] + "</td><td><span id=\"ov1valdisp\">2</span></td><td><input type=\"range\" id=\"ov1val\" min=\"0\" ";
		if (overlay.sliders[i][1]) {
			string += "use-x ";
		} else {
			string += "use-y ";
		}
		string += " /></td></tr>";
	}
	
	return string;
}

function deleteOverlay(button) {
	event.preventDefault();
	$(button).parent().remove();
	draw();
}

function moveUp(button) {
	event.preventDefault();
	var before = $(button).parent().prev();
	if (before.length > 0) {
		before.before($(button).parent());
		draw();
	}
}

function moveDown(button) {
	event.preventDefault();
	var after = $(button).parent().next();
	if (after.length > 0) {
		after.after($(button).parent());
		draw();
	}
}

function drawOverlay(div) {
	var overlay;
	var typeString = div.find("[id^=type]").val();
	for (var i = 0; i < overlays.length; i++) {
		if (typeString == overlays[i].name) {
			overlay = overlays[i];
			break;
		}
	}
	
	// Put slider values into an array
	var values = [];
	div.find("input[type=range]").each(function() {
		values.push($(this).val());
	});
	
	overlay.draw(div.find("[id^=ovcol]").val(), values);
}


// *******************
// OVERLAY DEFINITIONS
// *******************

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
