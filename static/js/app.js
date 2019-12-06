/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */
function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }

d3.json("samples.json").then((data)=>{
  console.log(data);
  var sample_id = data.names;
  var samples = data.samples;
  var metadata = data.metadata;
  init(samples[0], metadata[0]);
  dropBox(sample_id);
});

function init(sample, metadata){ //Building initial graphs and info
  console.log(sample);
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
};

function dropBox(sample_ids){
  console.log(sample_ids);
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

  
  
  
  // for(id in sample_ids){
  //   dropdown.html(`<option value ${id}=>${id}</option>`);
  // }
}