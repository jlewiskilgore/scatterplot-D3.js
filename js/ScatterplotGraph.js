var dataUrl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

d3.json(dataUrl, function(json) {
	console.log(json);
	var dataSet = json;
});