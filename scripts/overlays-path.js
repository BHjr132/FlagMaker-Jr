var pathOverlays = [
	{
		name: "Anchor",
		width: 234,
		height: 297,
		path: "m -0.189247,-147.99179 c -16.506879,0 -29.90625,13.39938 -29.90625,29.90625 0,13.8823 9.480636,25.573398 22.3125,28.937508 l -0.28125,6.09375 -42.34375,-0.1875 0,11.3125 41.65625,-0.3125 -7.90625,168.093746 c 0,0 -0.03003,14.840196 -16.6875,13.374996 C -79.108296,105.20163 -94.37675,78.945714 -94.37675,78.945714 l 6.59375,-4.34375 -28.84375,-23.84375 4.0625,40.5 6.5,-4.15625 c 0,-10e-6 11.76703,21.207796 38.937503,33.187496 24.455337,9.87576 39.33429,10.55008 55.21875,18.4375 6.89796,3.42924 11.875,9.375 11.875,9.375 0,0 4.72704,-5.94578 11.625,-9.375 15.884459,-7.88742 30.76342,-8.56173 55.21875,-18.4375 27.17046,-11.9797 38.937507,-33.187496 38.937497,-33.187496 l 6.5,4.15625 4.03125,-40.5 -28.843747,23.84375 6.5625,4.34375 c 0,0 -15.20596,26.255926 -60.968751,30.281246 -16.657409,1.4652 -16.718749,-13.374996 -16.718749,-13.374996 l -7.8750003,-168.093746 41.6250003,0.3125 0,-11.3125 -42.34375,0.1875 -0.28125,-6.09375 c 12.816969,-3.37421 22.281249,-15.065788 22.281249,-28.937508 0,-16.50688 -13.399369,-29.90625 -29.906249,-29.90625 z m 0,9.3125 c 11.37141,0 20.593749,9.22235 20.593749,20.59375 0,8.8441 -5.575049,16.36294 -13.406249,19.281254 l -0.15625,-3.062504 -14.03125,0 -0.15625,3.062504 c -7.84557,-2.910904 -13.4375,-10.426834 -13.4375,-19.281254 0,-11.3714 9.22235,-20.59375 20.59375,-20.59375 z"
	},
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
			data: overlay.path,
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
					d: this.data,
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
