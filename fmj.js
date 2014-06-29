var division = "grid";
var colors = ['rgb(93, 53, 39);', 'rgb(130, 36, 51);', 'rgb(198, 12, 48);', 'rgb(255, 99, 25);', 'rgb(253, 200, 47);','rgb(254, 221, 0);', 'rgb(51, 115, 33);', 'rgb(20, 77, 41);', 'rgb(40, 78, 54);', 'rgb(99, 153, 171);', 'rgb(0, 101, 189);', 'rgb(0, 57, 166);', 'rgb(0, 38, 100);', 'rgb(0, 33, 71);', 'rgb(0, 0, 0);', 'rgb(141, 129, 123);', 'rgb(255, 255, 255);'];

$(document).ready(function() {
	// Set up color pickers
	$("#divColors input").spectrum({
		showPalette: true,
		showSelectionPalette: true,
		palette: colors,
		localStorageKey: "flagmakerjr"
	});
	
	$("#divColors input").change(function() {
		draw();
	});
	
	// Hook up events
	$(".ratio").change(function() {
		var x = $("#ratioWidth").val();
		var y = $("#ratioHeight").val();
		setRatio(x, y);
	});
	
	$("input[type=range]").change(function() {
		$("#" + $(this).attr("id") + "disp").html($(this).val());
		draw();
	});
	
	$(".divbutton").click(function() {
		division = $(this).attr("id");
		draw();
	});
	
	// Initialize all values
	newFlag();
});

function newFlag() {
	$("#div1col").spectrum("set", colors[1]);
	$("#div2col").spectrum("set", colors[5]);
	$("#div3col").spectrum("set", colors[11]);
	$("#div1val").val(2);
	$("#div2val").val(2);
	$("#div3val").val(2);
	$("#div1valdisp").text(2);
	$("#div2valdisp").text(2);
	$("#div3valdisp").text(2);
	division = "grid";
	setRatio(3, 2);
}

function setRatio(x, y) {
	$("#ratioWidth").val(x);
	$("#ratioHeight").val(y);
	
	// Set grid dropdown - break into own function!
	$("#gridSize").children().remove();
	for(var i = 1; i <= 20; i++) {
		$("#gridSize").append("<option>" + (i*y) + ":" + (i*x) + "</option>");
	}
	
	$("#flag").width(400);
	$("#flag").height(400 * y / x);
	
	setDivs(x > y ? x : y);
	draw();
}

function setDivs(max) {
	$("input[type=range]").each(function() {
		$(this).attr("max", max);
	});
}

function makeSVG(tag, attrs) {
	var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
	for (var k in attrs)
		el.setAttribute(k, attrs[k]);
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
}

function showSliders(count) {
	if (count == 0) {
		$("#div1valdisp").hide();
		$("#div1val").hide();
		$("#div2valdisp").hide();
		$("#div2val").hide();
		$("#div3valdisp").hide();
		$("#div3val").hide();
	} else if (count == 2) {
		$("#div1valdisp").show();
		$("#div1val").show();
		$("#div2valdisp").show();
		$("#div2val").show();
		$("#div3valdisp").hide();
		$("#div3val").hide();
	} else if (count == 3) {
		$("#div1valdisp").show();
		$("#div1val").show();
		$("#div2valdisp").show();
		$("#div2val").show();
		$("#div3valdisp").show();
		$("#div3val").show();
	}
}

function exportSvg() {
	var pom = document.createElement("a");
	pom.setAttribute("href", "data:image/svg+xml;charset=utf-8," + $('<svg>').append($('#flag').clone()).html(), "flag.svg");
	pom.setAttribute("download", "flag.svg");
	pom.click();
}
