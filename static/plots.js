//Plot.ly Homework Week 15

function showMetadata(SampleId)
{        
    console.log(`Calling showMetadata(${SampleId})`); 

    d3.json("../data/samples.json").then((data) => {
        var metadata = data.metadata;

        var results = metadata.filter(m => m.id == SampleId);
            var result = results[0];
        
        var demoCardArea = d3.select("#sample-metadata");
        demoCardArea.html(""); 

        Object.entries(result).forEach(([key, value]) => {
        var metadata = demoCardArea.append("h6")
            .text(`${key}: ${value}`);
            
        });
        
    });
      
}


function drawBarGraph(SampleId)
{
    console.log(`Calling drawBarGraph(${SampleId})`);
    var barChartArea = d3.select("#bar");
    
    d3.json("../data/samples.json").then((data) => {
        //Sample Data -------------------
        var samples = data.samples;
            console.log(samples);
            var results = samples.filter(s => s.id == SampleId);
                var result = results[0];
               
                    var otu_ids = result.otu_ids;
                    var otu_labels = result.otu_labels;
                    var values = result.sample_values;

                    yticks = otu_ids.slice(0,10)
                    .map(otuId => `OTU ${otuId}`)
                    .reverse();

                var barData = {
                    x: values.slice(0, 10).reverse(),
                    y: yticks,
                    type: "bar",
                    text: otu_labels.slice(0, 10).reverse(),
                    orientation: "h",
                    hovertext: otu_labels
                };

                barArray = [barData];

                barLayout = {
                    title:"Top 10 OTUs (Bacteria Cultures) Found",
                    margin: {t: 30, l: 110},
                    xaxis: {title: "Qty. of Sample Values"},
                    yaxis: {title: "OTU ID"},
                    barmode: 'stack'
                };

            Plotly.newPlot("bar", barArray, barLayout);
    });
}
           
        // var wfreq = testSubjMetadata.forEach(item => 
        //     console.log(`Wash Freq. = ${item.wfreq}`));         
    





function drawBubbleChart(SampleId)
{
    console.log(`Calling drawBubbleChart(${SampleId})`);
    var bubbleChartArea = d3.select("#bubble");
    
    d3.json("../data/samples.json").then((data) => {
        var samplesData = data.samples; 
        console.log(samplesData);    
        
        var results = samplesData.filter(s => s.id == SampleId);
        var result = results[0];

        var xaxis = result.otu_ids;
        var yaxis = result.sample_values;
        var size = result.sample_values;
        var color = result.otu_ids;
        var labels = result.otu_labels;
        

    var bubbleChartData = {
        x: xaxis,
        y: yaxis,
        text: labels,
        mode: 'markers',
        marker: {
                size: size,
                color: color}
        };
    
    var data = [bubbleChartData];
    var layout = {
        title: "Belly Button Bacteria",
        xaxis: {title: "OTU ID"},
        margin: {t: 30, l: 50}
        };
    
    Plotly.newPlot("bubble", data, layout);
    });
}
// Event handler; calls each function
function optionChanged(newSampleId) 
{
        console.log(`User selected new sample ID: ${newSampleId}`);
        drawBubbleChart(newSampleId);
        drawBarGraph(newSampleId);
        showMetadata(newSampleId);
}


function initDashboard() 
{
    console.log("Initializing Dashboard ...");
    
    //Select dropdown element
    var subjSelectorArea = d3.select("#selDataset");
        
    //Read in json data and log to console
    d3.json("../data/samples.json").then((data) => {
        console.log(data); //object
    
    
        //Assign "names" list to variable
        var sampNames = data.names;
            console.log(sampNames);
    
        sampNames.forEach((SampleId) => {
            subjSelectorArea.append("option")
                .text(SampleId)
                .property("value", SampleId);
        });
                
    
        var SampleId = sampNames[0];
        
        drawBarGraph(SampleId);
        drawBubbleChart(SampleId); 
        showMetadata(SampleId);   
    });
}
//call initDashboard function to load page with default test subject sample ID (name) value   
initDashboard(); 