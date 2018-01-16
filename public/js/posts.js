$(document).ready(function() {
var timerFunc;

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
          showwindow(err)
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
          showwindow(err);
      }
  })

  });

  const showwindow = function(error){
      $('#error').css("opacity", 50)
      clearTimeout(timerFunc)
      $('#error').html(error.responseText)
      timerFunc = setTimeout(hidewindow, 1000);
  }

  const hidewindow = function(){
      $('#error').css("opacity", 0)
    }

});
