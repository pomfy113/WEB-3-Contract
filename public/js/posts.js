$(document).ready(function() {

$('.submit-button').click(function (e) {
    $(this).parent().submit()
    $("#error").offset({left:e.pageX+20,top:e.pageY});
})

  $('.vote-up').submit(function (e) {
    e.preventDefault();
    var answerId = $(this).data('id');
    $.ajax({
      type: 'PUT',
      url: "/comments/" + answerId + '/vote-up',
      success: function(data) {
          console.log("voted up!");
          response = JSON.parse(data)
          $('#answer-' + response.id).html(response.score);
      },
      error: function(err) {
          window.setTimeout(hidewindow, 1000)
          $('#error').css("opacity", 50);
          $('#error').html(err.responseText);
      }
    });
  });

  $('.vote-down').submit(function (e) {
    e.preventDefault();
    var answerId = $(this).data('id');
    $.ajax({
      type: 'PUT',
      url: "/comments/" + answerId + '/vote-down',
      success: function(data) {
        console.log("voted down!");
        response = JSON.parse(data)
        $('#answer-' + response.id).html(response.score);
      },
      error: function(err) {
        $('#error').css("opacity", 50)
        $('#error').html(err.responseText)
        setTimeout(hidewindow, 1000);

        // $('#error').delay(5000).css("opacity", 0)
        // $('#error')
      }
  })

  });


  const hidewindow = function(){
      $('#error').css("opacity", 0)
    }

});
