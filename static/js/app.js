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
  var trace={
    x: sample.sample_values,
    y: sample.otu_ids,
    text: [sample.otu_labels],
    type: 'bar',
    orientation: 'h'
  }

  var layout={
    title: `Patient ${sample.id}`,
  }

  var data = [trace];

  Plotly.newPlot('bar', trace, layout);
}

