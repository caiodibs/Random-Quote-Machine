function getMessage(){
  // Cleaning stuff
  $("#inspiring-message").html("");
  $('#tweet-me').prop("href","");
  $("#get-message").prop("disabled",true);
  // Preparing parameters to call API
  var params = "method=getQuote&format=jsonp&lang=en&jsonp=?";
  var url = "https://api.forismatic.com/api/1.0/";
  // Calling API
  $.getJSON(url, params).done(function(res){
    // Success. showing HTML
    $("#inspiring-message").append("<p>" + res.quoteText + "</p>");
    $("#inspiring-message").append("<small>" + res.quoteAuthor + "</small><br/>");
    $("#inspiring-message").append("<small>Reference: <a href='" + res.quoteLink + "' target='_blank'>" + res.quoteLink + "</a></small>");
    // Twitter Page
    $('#tweet-me').prop('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=forismatic&text=' + encodeURIComponent('"' + res.quoteText + '" ' + res.quoteAuthor));
    $("#get-message").prop("disabled",false);
  }).fail(function(jqxhr, textStatus, err){
    // If something goes wrong...
    $("#inspiring-message").html("<p>" + textStatus + ", " + err + "</p>");
    $("#get-message").prop("disabled",false);
  });
}
$(document).ready(function() {
    $("#get-message").on("click",function(){
      getMessage();
    });
});