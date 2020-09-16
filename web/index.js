
$( document ).ready(function() {
  let temp = $("<input>");
  let seed = location.hash.substr(1);
  
  if (seed) {
    $.getJSON( "https://midsomerplots.acrossthecloud.net/plot?seed="+seed, function( data ) {
      $( "#plot" ).html( data.plot );
    });
  } else {
    $.getJSON( "https://midsomerplots.acrossthecloud.net/plot", function( data ) {
      location.hash=data.seed
      $( "#plot" ).html( data.plot );
    });
  }



  $("#newPlot").click(function() {
    $.getJSON( "https://midsomerplots.acrossthecloud.net/plot", function( data ) {
      $( "#plot" ).html( data.plot );
    });
  });



  $('#share').click(function() {
    $("body").append(temp);
    temp.val(location.href).select();
    document.execCommand("copy");
    temp.remove();
    $("#share").text("URL copied!");
  });

});

