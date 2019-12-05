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
  init(samples[0]);
});

function init(sample){
  console.log(sample);
  
  var sval = Object.values(sample.sample_values).slice(0,10);
  var ids = Object.values(sample.otu_ids).slice(0,10);
  var labels = Object.values(sample.otu_labels).slice(0,10);
  console.log(sval, ids, labels);

  var trace={
    x: ids,
    y: sval,
    text: labels,
    type: 'bar',
    orientation: 'h'
  }

  var layout={
    title: `Patient ${sample.id}`,
    xaxis: {title: ''}
  }

  var data = [trace];

  Plotly.newPlot('bar', data, layout);
}

