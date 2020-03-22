//Plot.ly Homework Week 15
var url = "data/samples.json"

//Get json data and log to console
d3.json(url).then(function(data){
    console.log(data);
});

const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);


var trace1 = {
    x: [],
    y: [] ,
    type: "bar" //, or "line", or "pie", or "scatter", "box"
};

var data = [trace1];

var layout = {
    title: "Chart Title",
    xaxis: {title: " "},
    yaxis: {title: " " }
};

Plotly.newPlot("plot", "bar-plot", data, layout);