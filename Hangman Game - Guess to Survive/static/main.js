/* Submit letter */

$('#letter-form').submit(function(e) {
  var data = $("#letter-form").serialize();
  
  /* Empty input */
  
  letter = document.getElementById("letter").value
  $('#letter-form input').val('');
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
        
        updateDrawing(data.errors, letter);

      }
    }
  });
  
  e.preventDefault();
  
});

function updateDrawing(errors, buttonpressed) {
  $('#hangman-drawing').children().slice(0, errors.length).show();
  
  if (used_already(buttonpressed, errors.toLowerCase().split("")))document.getElementById(buttonpressed).style.backgroundColor="red";
  else document.getElementById(buttonpressed).style.backgroundColor="green";
}
