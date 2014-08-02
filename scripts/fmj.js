var division = "grid";
var maxX, maxY;
var colors = ['rgb(93, 53, 39);', 'rgb(130, 36, 51);', 'rgb(198, 12, 48);', 'rgb(255, 99, 25);', 'rgb(253, 200, 47);','rgb(254, 221, 0);', 'rgb(51, 115, 33);', 'rgb(20, 77, 41);', 'rgb(40, 78, 54);', 'rgb(99, 153, 171);', 'rgb(0, 101, 189);', 'rgb(0, 57, 166);', 'rgb(0, 38, 100);', 'rgb(0, 33, 71);', 'rgb(0, 0, 0);', 'rgb(141, 129, 123);', 'rgb(255, 255, 255);'];

$(document).ready(function() {
	loadOverlays();
	
	// Set up color pickers
	$("#divColors input").each(function() { makePalette($(this)); });
	
	$("#divColors input").change(function() {
		draw();
	});
	
	// Hook up events
	$(".ratio").change(function() {
		setRatio($("#ratioWidth").val(), $("#ratioHeight").val());
	});
	
	$("#gridSize").change(function() {
		var val = $("#gridSize").val().split(':');
		maxY = val[0];
		maxX = val[1];
		setSliderMaxes(maxX, maxY);
		draw();
	});
	
	$(".divbutton").click(function() {
		division = $(this).attr("id");
		draw();
	});
	
	$("#divisions input").bind("change", function() {
		draw();
	});
});

function makePalette(p) {
	p.spectrum({
		showPalette: true,
		showSelectionPalette: true,
		palette: colors,
		localStorageKey: "flagmakerjr"
	});
}

$(window).load(function() {
	newFlag();
});

$(window).resize(function() {
	setFlagSize();
});

function newFlag() {
	$("#div1col").spectrum("set", colors[1]);
	$("#div2col").spectrum("set", colors[5]);
	$("#div3col").spectrum("set", colors[11]);
	$("#div1val").val(2);
	$("#div2val").val(2);
	$("#div3val").val(2);
	$("#overlays").empty();
	division = "grid";
	maxX = 3;
	maxY = 2;
	setRatio(3, 2);
}

function setRatio(x, y) {
	$("#ratioWidth").val(x);
	$("#ratioHeight").val(y);
	
	$("#gridSize").children().remove();
	for(var i = 1; i <= 20; i++) {
		$("#gridSize").append("<option>" + (i*y) + ":" + (i*x) + "</option>");
	}
	
	$("#gridSize").selectmenu("refresh");
	$("#gridSize").trigger("change");
	
	setSliderMaxes(x, y);
	setFlagSize();
}

function setFlagSize() {
	$("#flag").height($("#flag").width() * $("#ratioHeight").val() / $("#ratioWidth").val());
	draw();
}

function setSliderMaxes(x, y) {
	$("#divisions input[type=number]").each(function() {
		$(this).prop({
			max: x > y ? x : y
		}).slider("refresh");
	});
	
	$("#overlayArea input[type=number]").each(function() {
		var useX = $(this).attr("use-x");
		var useY = $(this).attr("use-y");
		var max = x;
		
		var newValue = $(this).val() * (max / $(this).attr("max"));
		if (useY !== undefined && useY !== false) {
			max = y;
			newValue = $(this).val() * (max / $(this).attr("max"));
			$(this).attr("max", y);
		} else {
			$(this).attr("max", max);
		}
		
		$(this).val(newValue.toFixed(1));
		$(this).parent().prev().children().html($(this).val());
	});
}

function makeSVG(tag, attrs, child) {
	var el = document.createElementNS("http://www.w3.org/2000/svg", tag);
	for (var k in attrs) {
		el.setAttribute(k, attrs[k]);
	}
	if (child != null) {
		el.appendChild(child);
	}
	return el;
}

function drawThing(thing) {
	document.getElementById("flag").appendChild(thing);
}

function draw() {
	$("#flag").empty();
	
	switch(division) {
		case "grid":
			$("#div3col").spectrum("disable");
			showSliders(2);
			drawGrid();
			break;
		case "fesses":
			$("#div3col").spectrum("enable");
			showSliders(3);
			drawFesses();
			break;
		case "pales":
			$("#div3col").spectrum("enable");
			showSliders(3);
			drawPales();
			break;
		case "bendsf":
			$("#div3col").spectrum("disable");
			showSliders(0);
			drawBendsF();
			break;
		case "bendsb":
			$("#div3col").spectrum("disable");
			showSliders(0);
			drawBendsB();
			break;
		case "x":
			$("#div3col").spectrum("disable");
			showSliders(0);
			drawX();
			break;
	}
	
	$("#overlays").children().filter("div").each(function() {
		drawOverlay($(this));
	});
}

function showSliders(count) {
	if (count == 0) {
		$("#div1val").parent().hide();
		$("#div2val").parent().hide();
		$("#div3val").parent().hide();
		$("#div3col").next().hide();
	} else if (count == 2) {
		$("#div1val").parent().show();
		$("#div2val").parent().show();
		$("#div3val").parent().hide();
		$("#div3col").next().hide();
	} else if (count == 3) {
		$("#div1val").parent().show();
		$("#div2val").parent().show();
		$("#div3val").parent().show();
		$("#div3col").next().show();
	}
}

function exportSvg() {
	var pom = document.createElement("a");
	pom.setAttribute("href", "data:image/svg+xml;charset=utf-8," + $('<svg>').append($('#flag').clone()).html(), "flag.svg");
	pom.setAttribute("download", "flag.svg");
	pom.click();
}
