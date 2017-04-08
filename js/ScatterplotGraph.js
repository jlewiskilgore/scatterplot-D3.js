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
		.attr("viewBox", "100 -25 550 550");

	// X Axis
	var xScale = d3.scaleLinear()
		.domain([2200, 2400])
		.range([0, 400]);

	var xAxis = d3.axisBottom()
		.scale(xScale)
		.ticks(10);

	svg.append("g")
		.attr("transform", "translate(200," + 375 + ")")
		.call(xAxis);

	svg.append("text")
		.style("text-anchor", "middle")
		.attr("transform", "translate(400," + 425 +")")
		.text("Time (in Seconds)");

	// Y Axis
	var yScale = d3.scaleLinear()
		.domain([1, 40])
		.range([0, 375]);

	var yAxis = d3.axisLeft()
		.scale(yScale)
		.ticks(10);

	svg.append("g")
		.attr("transform", "translate(200," + 0 + ")")
		.call(yAxis);

	svg.append("text")
		.style("text-anchor", "end")
		.attr("transform", "translate(150, 150)rotate(-90)")
		.text("Cyclist Place");

	// Append Circles to Scatterplot
	svg.selectAll("circle")
		.data(dataSet)
		.enter()
		.append("circle")
		.attr("cx", function(d) {
			return xScale(d.Seconds) + 200;
		})
		.attr("cy", function(d) {
			return yScale(d.Place);
		})
		.attr("r", 5);
});