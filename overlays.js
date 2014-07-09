var overlayId = 0;

function addOverlay() {
	$("#overlays").append("<div id=\"overlay"+ overlayId + "\" class=\"overlay\">" +
		"<button onclick=\"deleteOverlay(this);\">Delete</button>" +
		"<input type=\"text\" id=\"ovcol-" + overlayId + "\" /><br />" +
		"<span id=\"ov1valdisp\">2</span> <input type=\"range\" id=\"ov1val\" min=\"0\" use-x /><br />" +
		"<span id=\"ov2valdisp\">2</span> <input type=\"range\" id=\"ov2val\" min=\"0\" use-y /><br />" +
		"<span id=\"ov3valdisp\">2</span> <input type=\"range\" id=\"ov3val\" min=\"0\" use-x /><br />" +
		"</div>");
	
	makePalette($("#ovcol-" + overlayId));
	$("#ovcol-" + overlayId).change(function() {
		draw();
	});
	setSliderMaxes(maxX, maxY);
	draw();
	overlayId++;
}

function deleteOverlay(button) {
	$(button).parent().remove();
	draw();
}

function drawOverlay(div) {
	var values = [];
	div.children("input[type=range]").each(function() {
		values.push($(this).val());
	});
	
	// Draw cross
	var w = $("#flag").width();
	var h = $("#flag").height();
	
	var t = w * values[2] / maxX;
	var x = w * values[0] / maxX - t / 2;
	var y = h * values[1] / maxY - t / 2;
	
	var fill = div.find("[id^=ovcol]").val();
	
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
