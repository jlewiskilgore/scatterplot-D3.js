var dataUrl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

d3.json(dataUrl, function(json) {
	console.log(json);
	var dataSet = json;

	var height = 600;
	var width = 600;

	d3.select(".scatterplot-title").text("Scatterplot of Doping Allegations in Professional Cycling");

	var div = d3.select(".scatterplot-title")
		.append("div")
				.attr("class", "tooltip")
				.style("opacity", 0);


	var svg = d3.select(".scatterplot-graph")
		.attr("width", width)
		.attr("height", height)
		.attr("viewBox", "100 -70 550 550");

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
		.text("Time on Alpe d'Huez Course(in Seconds)");

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
			.attr("r", 5)
			.attr("fill", function(d) {
				if(d.Doping == "") {
					return "#0ff";
				}
				else {
					return "#ff0000";
				}
			})
			.on("mouseover", function(d) {
				div.transition()
					.duration(200)
					.style("opacity", 1);
				div.html(d.Name + " (" + d.Nationality + ")" + "<br/>"
					+ "All-Time Ranking: " + d.Place + "<br/>"
					+ "Time: " + d.Time + "<br/><br/>"
					+ d.Doping + "<br/>")
					.style("left", (d3.event.pageX) + "px")
					.style("top", (d3.event.pageY) + "px");
			})
			.on("mouseout", function(d) {
				div.transition()
					.duration(200)
					.style("opacity", 0);
			});

	// Legend for Non-Doping
	svg.append("circle")
		.attr("cx", function(d) {
			return xScale(2425);
		})
		.attr("cy", function(d) {
			return yScale(1);
		})
		.attr("r", 5)
		.attr("fill", "#0ff");

	svg.append("text")
		.attr("x", function(d) {
			return xScale(2425) + 10;
		})
		.attr("y", function(d) {
			return yScale(1) + 5;
		})
		.attr("text-anchor", "left")
		.text("No Doping History");

	// Legend for Doping
	svg.append("circle")
		.attr("cx", function(d) {
			return xScale(2425);
		})
		.attr("cy", function(d) {
			return yScale(3);
		})
		.attr("r", 5)
		.attr("fill", "#ff0000");

	svg.append("text")
		.attr("x", function(d) {
			return xScale(2425) + 10;
		})
		.attr("y", function(d) {
			return yScale(3) + 5;
		})
		.attr("text-anchor", "left")
		.text("Alleged Doping History");
});