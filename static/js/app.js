

d3.json("samples.json").then((data) => {

  //load Default Charts
  optionChanged( data.names[0] );

  //create dropdown
  for(id of data.names) {
    
    
    var dropdownMenu = d3.select( "#selDataset" );
    dropdownMenu.append( 'option' ).text( id ).property( 'value' );

  };

}); 

//event listener
function optionChanged(value)
{
  //change card
  changeCard(value);

  //change plotly
  changePlotly(value);
}

//change card
function changeCard(value)
{
  d3.json("samples.json").then((data) => {
    
    //get metadata according to drop down value
    var metadata = data.metadata.find(function(object) {return object.id == value;} );

    //define card labels
    var id = 'id: ' + metadata.id + '<br>';
    var ethnicity = 'ethnicity: ' + metadata.ethnicity + '<br>';
    var gender = 'gender: ' + metadata.gender + '<br>';
    var age = 'age: ' + metadata.age + '<br>';
    var location = 'location: ' + metadata.location + '<br>';
    var bbtype = 'bbtype: ' + metadata.bbtype + '<br>';
    var wfreq = 'wfreq: ' + metadata.wfreq;

    //define text
    var cardText = id + ethnicity + gender + age + location + bbtype + wfreq;

    //append Text to html
    document.getElementById('sample-metadata').innerHTML = cardText;
    
  });
  
}


function changePlotly(value)
{
  d3.json("samples.json").then((data) => {

    //get samples according to drop down value
    var samples = data.samples.find(function(object) { return object.id == value;} );
    
    var formattedData = {
      otu_ids: [],
      sample_values: [],
      otu_labels: []
    };

    //Find top 10
    for ( var i = 0; i < 10; i++ )
    {
      formattedData.otu_ids.push(samples.otu_ids[ i ]);
      formattedData.sample_values.push(samples.sample_values[ i ]);
      formattedData.otu_labels.push(samples.otu_labels[ i ]);
    }
    
    //define bar chart reference
    var barChart = document.getElementById('bar');

    //make bar
    var barData = [{
      x: formattedData.otu_ids,
      y: formattedData.sample_value,
      type: 'bar',
      orientation: 'h' 
    }];

    var layout = {
      title: 'OTU ID'
    };

    //append plotly chart to html
    barChart.append( Plotly.newPlot('bar', barData, layout ));

    //make bubble chart
    var bubbleChart = document.getElementById('bubble');

    var bubbleData = [{
      x: formattedData.otu_ids,
      y: formattedData.sample_value,
      mode: 'markers',
      marker: {
        size: formattedData.sample_value,
        color: formattedData.otu_ids
      }
    }];

    var layout = {
      title: 'OTU ID',
      showlegend: false,
      height: 600,
      width:600
    };

    //append plotly chart to html
    bubbleChart.append(Plotly.newPlot('bubble', bubbleData, layout));
  });
}

