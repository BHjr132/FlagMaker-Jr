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
	
	var string = "<div id=\"overlay" + overlayId + "\" data-role=\"collapsible\" data-collapsed-icon=\"carat-d\" data-expanded-icon=\"carat-u\" data-collapsed=\"false\">" +
				"<h4>" + overlay.name + "</h4>" +
				"<div class=\"buttons\" data-role=\"controlgroup\" data-type=\"horizontal\" data-mini=\"true\">" +
				"<a href=\"#\" class=\"ui-btn ui-corner-all\" onclick=\"deleteOverlay(this);\"><img src=\"img\\remove.png\" title=\"Remove\" /></a>" +
				"<a href=\"#\" class=\"ui-btn ui-corner-all\" onclick=\"moveUp(this);\"><img src=\"img\\moveup.png\" title=\"Move up\" /></a>" +
				"<a href=\"#\" class=\"ui-btn ui-corner-all\" onclick=\"moveDown(this);\"><img src=\"img\\movedown.png\" title=\"Move down\" /></a>" +
				"<a href=\"#\" class=\"ui-btn ui-disabled ui-corner-all\" onclick=\"clone(this);\" disabled><img src=\"img\\clone.png\" title=\"Clone\" /></a>" +
				"</div>" +
				"<input type=\"text\" id=\"ovcol-" + overlayId + "\" data-role=\"none\" />" +
				"<select id=\"type-" + overlayId + "\" data-mini=\"true\">" + overlayNames() + "</select><div id=\"sliders\">";
	
	string += getSliderString(overlay, overlayId);
	string += "</div></div>";
	
	$("#overlays").append(string);
	
	// Apply jQuery mobile styles to dynamic controls
	makePalette($("#ovcol-" + overlayId));
	$("#overlay" + overlayId).collapsible();
	$("#overlay" + overlayId).trigger("create");
	
	$("#ovcol-" + overlayId).change(function() {
		draw();
	});
	
	$("#overlay" + overlayId + " input[type=number]").bind("change", function() {
		draw();
	});
	
	$("#type-" + overlayId).change(function() {
		var id = $(this).attr("id").substr($(this).attr("id").indexOf("-") + 1);
		var sliderDiv = $(this).parent().parent().next();
		sliderDiv.empty();
		var newOverlayId = document.getElementById($(this).attr("id")).selectedIndex;
		var newOverlay = overlays[newOverlayId];
		sliderDiv.html(getSliderString(newOverlay), id);
		sliderDiv.trigger("create");
		sliderDiv.find("input[type=number]").bind("change", function() {
			draw();
		});
		setSliderMaxes(maxX, maxY);
		$("#overlay" + id).children("h4").children("a")[0].innerHTML = newOverlay.name;
		draw();
	});
	
	setSliderMaxes(maxX, maxY);
	draw();
	overlayId++;
}

function getSliderString(overlay, id) {
	var string = "";
	for (var i = 0; i < overlay.sliders.length; i++) {
		var label = overlay.sliders[i][0];
		var name = "slider-" + id + "-" + i;
		string += "<label for=\"slider-" + name + "-" + i + "\">" + label + "</label>" +
		          "<input type=\"range\" name=\"" + name + "\" id=\"" + name + "\" data-highlight=\"true\" min=\"0\" max=\"100\" value=\"50\" step=\".1\" ";
		if (overlay.sliders[i][1]) {
			string += "use-x ";
		} else {
			string += "use-y ";
		}
		string += ">";
	}
	
	return string;
}

function deleteOverlay(button) {
	event.preventDefault();
	$(button).parent().parent().parent().parent().remove();
	draw();
}

function moveUp(button) {
	event.preventDefault();
	var before = $(button).parent().parent().parent().parent().prev();
	if (before.length > 0) {
		before.before($(button).parent().parent().parent().parent());
		draw();
	}
}

function moveDown(button) {
	event.preventDefault();
	var after = $(button).parent().parent().parent().parent().next();
	if (after.length > 0) {
		after.after($(button).parent().parent().parent().parent());
		draw();
	}
}

function drawOverlay(div) {
	var overlay;
	var typeString = div.find("[id^=type]").last().val();
	for (var i = 0; i < overlays.length; i++) {
		if (typeString == overlays[i].name) {
			overlay = overlays[i];
			break;
		}
	}
	
	// Put slider values into an array
	var values = [];
	div.find("input[type=number]").each(function() {
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
