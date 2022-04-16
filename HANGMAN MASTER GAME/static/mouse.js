/* $(document).mousemove(function(event) {
  windowWidth = $(window).width();
  windowHeight = $(window).height();

  mouseXpercentage = Math.round(event.pageX / windowWidth * 100);
  mouseYpercentage = Math.round(event.pageY / windowHeight * 100);

  $('.radial-gradient').css('background', 'radial-gradient(at ' + mouseXpercentage + '% ' + mouseYpercentage + '%, #3498db, #9b59b6)');
}); */
keys = document.getElementsByClassName("kbd-letter")
//keys = document.querySelectorAll("kbd-letter");
console.log(keys)
for(let i = 0; i<keys.length; i++){
  keys[i].addEventListener("click", function(){
    buttonpressed = keys[i].id
  if(window.innerWidth<750) return
  document.getElementById("letter").value =buttonpressed
  document.getElementById('error-msg').style.display = "none";
    if(isLetter(buttonpressed) == false)document.getElementById('error-msg').style.display = "block";
    if(used_already(buttonpressed, usedletters)) document.getElementById('error-msg').style.display = "block";
    usedletters.push(buttonpressed)
  var data = $("#letter-form").serialize();
  /* Empty input */
  //$('#letter-form input').val('');
  $.ajax({
    type: "POST",
    url: '',
    data: data,
    success: function(data) {
      /* Refresh if finished */
      if (data.finished) {
        location.reload();
      }
      else {
        /* Update current */
        $('#current').text(data.current);
        /* Update errors */
        $('#errors').html(
          'Errors (' + data.errors.length + '/6): ' +
          '<span class="text-danger spaced">' + data.errors + '</span>');
          
        /* Update drawing */
        updateDrawing(data.errors, buttonpressed);
        
      }
    }
  });
  
  x.preventDefault()
  });
}