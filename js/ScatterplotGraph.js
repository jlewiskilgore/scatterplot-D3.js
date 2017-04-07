var dataUrl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

d3.json(dataUrl, function(json) {
	console.log(json);
	var dataSet = json;

	var height = 550;
	var width = 650;

	d3.select(".scatterplot-title").text("Scatterplot of Doping in Professional Cycling");

	var svg = d3.select(".scatterplot-graph")
		.attr("width", width)
		.attr("height", height)
		.attr("viewBox", "1200 -100 50 400");

	svg.selectAll("circle")
		.data(dataSet)
		.enter()
		.append("circle")
		.attr("cx", function(d) {
			console.log(d.Seconds);
			return d.Seconds / 2;
		})
		.attr("cy", function(d) {
			console.log(d.Place);
			return d.Place * 5;
		})
		.attr("r", 5);
});