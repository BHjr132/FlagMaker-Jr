var pathOverlays = [
	{
		name: "Star",
		width: 192,
		height: 180,
		path: "m 0,-100 24,68 H 96 L 40,12 60,80 0,40 -60,80 -40,12 -96,-32 h 72 z"
	}
];

function loadOverlaysPath() {
	for (var i = 0; i < pathOverlays.length; i++) {
		var overlay = pathOverlays[i];
		overlays[overlays.length] = {
			name: overlay.name,
			sliders: [["Left", true, 1], ["Top", false, 1], ["Size", true, 1], ["Rotation", true, 0]],
			draw: function (fill, values) {
				var width = $("#flag").width();
				var height = $("#flag").height();
				
				var xGridSize = width / maxX;
				var yGridSize = height / maxY;
				
				var x = values[0];
				var y = values[1];
				
				var finalCenterPointX = x * xGridSize;
				var finalCenterPointY = y * yGridSize;
				
				var idealPixelSize = values[2] / maxX * (width > height ? width : height);
				var scaleFactor = idealPixelSize / overlay.width;
				var rotate = values[3] / maxX * 360;
				
				var transformString = "translate(" + finalCenterPointX + "," + finalCenterPointY + ") rotate(" + rotate + ") scale(" + scaleFactor + ")";
				var path = makeSVG("path", {
					d: overlay.path,
					fill: fill
				}, null);
				var group = makeSVG("g", {
					transform: transformString,
				}, path);
				drawThing(group);
			}
		};
	}
}
