$('#register').submit(function (e) {
  e.preventDefault();
  let username = $('#username').val();
  let password = $('#password').val();
  let Userdata = {
      "username": username,
      "password": password
  }

  $.post('/register', Userdata, function(Userdata){
      $(location).attr('href', '/')
  }).catch((err) => {
      window.setTimeout(hide, 1000)
      $('#errorbox').css("opacity", "100")
      $('#errorbox').html(err.responseText)
      console.log(err.responseText)
  })

  const hide = function(){
      $('#errorbox').animate({opacity: "0"}, 1000)
  }

});

$('#login').submit(function (e) {
  e.preventDefault();
  let username = $('#user-name').val();
  let password = $('#pass-word').val();
  let Logindata = {
      "username": username,
      "password": password
  }

  $.post('/login', Logindata, function(Logindata){
      $(location).attr('href', '/')
  }).catch((err) => {
      window.setTimeout(hide, 1000)
      $('#errorbox').css("opacity", "100")
      $('#errorbox').html(err.responseText)
      console.log(err.responseText)
  })

  const hide = function(){
      $('#errorbox').animate({opacity: "0"}, 1000)
  }

});
