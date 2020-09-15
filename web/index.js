
$( document ).ready(function() {
  $.getJSON( "https://midsomerplots.acrossthecloud.net/plot", function( data ) {
    $( "#plot" ).html( data.plot );
  });

  $("#newPlot").click(function() {
    $.getJSON( "https://midsomerplots.acrossthecloud.net/plot", function( data ) {
      $( "#plot" ).html( data.plot );
    });
  });
  
});

