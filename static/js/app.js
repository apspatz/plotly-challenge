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
    console.log(sample_id);
    sample_id.forEach(element => {
       var sample_data = samples.map 
    });
});