//Plot.ly Homework Week 15

//Get json data and log to console
d3.json("../data/samples.json").then((data) => {
    console.log(data); //object
    
        //Sample Data -------------------
        var samples = data.samples;
        console.log(samples); //object

        var values = samples.forEach(sample => console.log(`Sample values = ${sample.sample_values}`));
        var otu_ids = samples.forEach(sample => console.log(`OTU ID = ${sample.otu_ids}`));
        var otu_labels = samples.forEach(sample => console.log(`Label = ${sample.otu_labels}`));
        
        //Test Subject Data ------------------
        var testSubjMetadata = data.metadata;
        console.log(testSubjMetadata); //object   
        
        var wfreq = testSubjMetadata.forEach(item => console.log(`Wash Freq. = ${item.wfreq}`));

    });

var subjSelectorArea = d3.select("#test-subjects")
var demoCardArea = d3.select("#metadata");
var barChartArea = d3.select("#hbar-plot");



//Bar chart
var trace1 = {
    x: values,
    y: otu_ids,
    type: "bar",
    orientation: "h" 
};

var data = [trace1];

var layout = {
    title: "Top 10 OTUs per Test Subject",
    xaxis: {title: "Qty. of Sample Values"},
    yaxis: {title: "OTU ID"},
    barmode: 'stack'
};
Plotly.newPlot("hbar-plot", data, layout);


// Gauge chart code from https://plot.ly/javascript/gauge-charts/
// var data = [
// 	{
// 		domain: { x: [0, 1], y: [0, 1] },
// 		value: 270,
// 		title: { text: "Speed" },
// 		type: "indicator",
// 		mode: "gauge+number"
// 	}
// ];
// var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
// Plotly.newPlot('myDiv', data, layout);