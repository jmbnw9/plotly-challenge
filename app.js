function dropdown() {
  d3.json("samples.json").then((sampledata) => {
    // console.log (sampledata)
    var samplenames = sampledata.names
    // console.log(samplenames)  
    var menu = d3.select("#selDataset")
    samplenames.forEach((x) => {
      menu.append("option").text(x).property("value")
    })
    // chart(samplenames[0])
    table(samplenames[0])
  })
}
dropdown()

function chart(sampleid) {

}

function table(sampleid) {
  d3.json("samples.json").then((sampledata) => {
    var sampletable = sampledata.metadata
    console.log(sampletable)
    var filteredData = sampletable.filter(x => x.id == sampleid);
    console.log(filteredData)
    ttable = d3.select("sample-metadata")
    ttable.html("")
        // Use d3 to append one table row `tr` for each ufo data object
    Object.entries(filteredData[0]).forEach(([key, value]) => {
      console.log(key)
      console.log(value)
      var row = ttable.append("tr")
      var cell = row.append("td");
      cell.text(`{value}`);
    });
  });

}

function optionChanged(sampleid) {
  chart(sampleid)
  table(sampleid)
}