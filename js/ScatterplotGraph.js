var dataUrl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

d3.json(dataUrl, function(json) {
	console.log(json);
	var dataSet = json;

	var height = 600;
	var width = 600;

	d3.select(".scatterplot-title").text("Scatterplot of Doping in Professional Cycling");

	var svg = d3.select(".scatterplot-graph")
		.attr("width", width)
		.attr("height", height)
		.attr("viewBox", "100 -25 400 400");

	var xScale = d3.scaleLinear()
		.domain([2000, 2500])
		.range([0, width]);

	var xAxis = d3.axisBottom()
		.scale(xScale)
		.ticks(10);

	var yScale = d3.scaleLinear()
		.domain([1, 40])
		.range([0, height]);

	var yAxis = d3.axisLeft()
		.scale(yScale)
		.ticks(10);

	svg.selectAll("circle")
		.data(dataSet)
		.enter()
		.append("circle")
		.attr("cx", function(d) {
			return d.Seconds - 2000;
		})
		.attr("cy", function(d) {
			return d.Place * 10;
		})
		.attr("r", 5);
});