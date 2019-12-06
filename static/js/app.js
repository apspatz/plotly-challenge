// Retrieving sample data
d3.json("samples.json").then((data)=>{
  console.log(data);
  var sample_id = data.names;
  var samples = data.samples;
  var metadata = data.metadata;
  
  // Builds initial plots and demographics
  init(samples[0], metadata[0]);

  // Builds dropdown menu
  dropBox(sample_id);
  
  // Updates plots and demographics upon new selection
  var dropdown = d3.select("#selDataset");
  dropdown.on("change", function(){
    var new_id = dropdown.property('value');
    console.log(new_id);
    var new_index = sample_id.indexOf(new_id);
    console.log(new_index);
    updatePlotly(samples[new_index], metadata[new_index]);
  });
});

function init(sample, metadata){ //Building initial graphs and info
  // Bar Graph
  var sval = Object.values(sample.sample_values).slice(0,10).reverse();
  var ids = Object.values(sample.otu_ids).slice(0,10).reverse();
  var labels = Object.values(sample.otu_labels).slice(0,10).reverse();
  var otuids = ids.map(value => `OTU ${value}`)

  var bartrace={
    x: sval,
    y: otuids,
    text: labels,
    type: 'bar',
    orientation: 'h'
  }
  var barlayout={
    title: `Subject ${sample.id}`,
    xaxis: {title: ''}
  }
  var bardata = [bartrace];
  Plotly.newPlot('bar', bardata, barlayout);

  // Bubble Chart
  var bubbletrace={
    x: sample.otu_ids,
    y: sample.sample_values,
    mode: 'markers',
    marker:{
      size: sample.sample_values,
      color: sample.otu_ids},
    text: sample.otu_labels
  }
  var bubblelayout={
    title: `Subject ${sample.id}`,
    xaxis: {title: "OTU"}
  }
  var bubbledata = [bubbletrace];
  Plotly.newPlot('bubble', bubbledata, bubblelayout);

  // Demographics
  var demobox = d3.select('#sample-metadata');
  demobox.html(`<table>
                  <tr><th>id: ${metadata.id}</th></tr>
                  <tr><th>ethnicity: ${metadata.ethnicity}</th></tr>
                  <tr><th>gender: ${metadata.gender}</th></tr>
                  <tr><th>age: ${metadata.age}</th></tr>
                  <tr><th>location: ${metadata.location}</th></tr>
                  <tr><th>bbtype: ${metadata.bbtype}</th></tr>
                  <tr><th>wfreq: ${metadata.wfreq}</th></tr>
                </table>`);

  // Bonus (Builds gauge)
  var wfreq = metadata.wfreq;
  console.log(`wfreq ${wfreq}`);

  var data = [
    {
    domain: { x: [0, 1], y: [0, 1] },
    value: wfreq,
    title: { text: `Weekly Washing Frequency of Participant ${metadata.id}` },
    type: "indicator",
    mode: "gauge+number",
    gauge: { axis: { range: [null, 9] },
            steps: [
              { range: [0, 2], color: "gray" },
              { range: [2, 4], color: "red" },
              { range: [4, 6], color: "yellow" },
              { range: [6, 8], color: "teal" },
              { range: [8, 9], color: "blue" }
            ] }
    }
  ];

  var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
  Plotly.newPlot("gauge", data, layout);
};

// Builds dropdown menu with all IDs
function dropBox(sample_ids){
  var dropdown = d3.select("#selDataset")
                    .selectAll("option")
                    .data(sample_ids)
                    .enter()
                    .append('option')
                    .attr('value', function(id){
                      return `${id}`;
                    })
                    .text(function(id){
                      return `${id}`;
                    });
}


// Updates plots and demographics based on new ID
function updatePlotly(sample, metadata){
  // Bar Chart updates
  var sval = Object.values(sample.sample_values).slice(0,10).reverse();
  var ids = Object.values(sample.otu_ids).slice(0,10).reverse();
  var labels = Object.values(sample.otu_labels).slice(0,10).reverse();
  var otuids = ids.map(value => `OTU ${value}`)

  var new_x = sval;
  var new_y = otuids;
  var new_text = labels;
  var new_title = `Subject ${sample.id}`;
  
  Plotly.restyle("bar", "x", [new_x]);
  Plotly.restyle("bar", "y", [new_y]);
  Plotly.restyle("bar", "text", new_text);
  Plotly.relayout("bar", 'title', new_title);
  
  

  // Bubble Chart updates
  var bubbletrace={
    x: sample.otu_ids,
    y: sample.sample_values,
    mode: 'markers',
    marker:{
      size: sample.sample_values,
      color: sample.otu_ids},
    text: sample.otu_labels
  }
  var new_x = sample.otu_ids;
  var new_y = sample.sample_values;
  var new_text = sample.otu_labels;

  Plotly.restyle("bubble", "x", [new_x]);
  Plotly.restyle("bubble", "y", [new_y]);
  Plotly.restyle("bubble", "marker.size", [new_y]);
  Plotly.restyle("bubble", "marker.color", [new_x]);
  Plotly.restyle("bubble", "text", [new_text]);
  Plotly.relayout("bubble", 'title', new_title);

  // Demographics updates
  var demobox = d3.select('#sample-metadata');
  demobox.html('');
  demobox.html(`<table>
                  <tr><th>id: ${metadata.id}</th></tr>
                  <tr><th>ethnicity: ${metadata.ethnicity}</th></tr>
                  <tr><th>gender: ${metadata.gender}</th></tr>
                  <tr><th>age: ${metadata.age}</th></tr>
                  <tr><th>location: ${metadata.location}</th></tr>
                  <tr><th>bbtype: ${metadata.bbtype}</th></tr>
                  <tr><th>wfreq: ${metadata.wfreq}</th></tr>
                </table>`);
  
  // Bonus (Updates gauge)
  var wfreq = metadata.wfreq;
  console.log(`wfreq ${wfreq}`);

  var new_title = `Weekly Washing Frequency of Participant ${metadata.id}`
  Plotly.restyle("gauge", "title.text", new_title);
  Plotly.restyle("gauge", "value", wfreq);
}