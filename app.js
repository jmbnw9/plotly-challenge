function chart(id) {
      d3.json("samples.json").then (sampledata =>{
          console.log(sampledata)
          var ids = sampledata.samples[0].otu_ids;
          console.log(ids)
          var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
          console.log(sampleValues)
          var labels =  sampledata.samples[0].otu_labels.slice(0,10);
          console.log (labels)
      // get only top 10 otu ids for the plot OTU and reversing it. 
          var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
      // get the otu id's to the desired form for the plot
          var OTU_id = OTU_top.map(d => "OTU " + d);
          console.log(`OTU IDS: ${OTU_id}`)

       // Creating the horizontal bar chart
          var labels =  sampledata.samples[0].otu_labels.slice(0,10);
          console.log(`OTU_labels: ${labels}`)
          var trace = {
              x: sampleValues,
              y: OTU_id,
              text: labels,
              marker: {
              color: 'blue'},
              type:"bar",
              orientation: "h",
          };
          // create data variable
          var data = [trace];
  
          // create layout variable to set plots layout
          var layout = {
              title: "Top 10 OTU",
              yaxis:{
                  tickmode:"linear",
              },
              margin: {
                  l: 100,
                  r: 100,
                  t: 100,
                  b: 30
              }
          };
  
          
      Plotly.newPlot("bar", data, layout);

          // Creating the bubble chart

          var trace1 = {
              x: sampledata.samples[0].otu_ids,
              y: sampledata.samples[0].sample_values,
              mode: "markers",
              marker: {
                  size: sampledata.samples[0].sample_values,
                  color: sampledata.samples[0].otu_ids
              },
              text:  sampledata.samples[0].otu_labels
  
          };
  
          var layout_2 = {
              xaxis:{title: "OTU ID"},
              height: 600,
              width: 1000
          };
  
          var data1 = [trace1];
  
      Plotly.newPlot("bubble", data1, layout_2); 
      
      });
  }  
  // Start creating the table information
  function table(id) {
      d3.json("samples.json").then((data)=> {
          var metadata = data.metadata;
          console.log(metadata)
          // filter the data by id
         var result = metadata.filter(meta => meta.id.toString() === id)[0];
        // select demographic panel to put data
         var demographicInfo = d3.select("#sample-metadata");
          
       // empty the demographic info panel each time before getting new id info
         demographicInfo.html("");
  
       // grab the necessary demographic data data for the id and append the info to the panel
          Object.entries(result).forEach((key) => {   
              demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
          });
      });
  }
  // create the function for the change event
  function optionChanged(id) {
      chart(id);
      table(id);
  }
  
  // creating the dropdown section
  function init() {
      var dropdown = d3.select("#selDataset");
  
      // read the data 
      d3.json("samples.json").then((data)=> {
          console.log(data)
  
          // get the id data to the dropdwown menu
          data.names.forEach(function(name) {
              dropdown.append("option").text(name).property("value");
          });
  
          // Display the data
          chart(data.names[0]);
          table(data.names[0]);
      });
  }
  
  init();