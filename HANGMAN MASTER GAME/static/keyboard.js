$(document).ready(function() {
  if (window.location.href.indexOf("play") > -1) {
    document.getElementById("keyboard").style.display = "flex";
    document.getElementById("vpacer").classList.remove("vspace");
    document.getElementById("Vspacer").classList.add("vspace1");
  }
});

function isLetter(c) {
  alphabets = 'abcdefghijklmnopqrstuvwxyz'.split("")
  for(let i = 0; i<alphabets.length; i++){
      if (c==alphabets[i]) return true
  }
  return false
}
 var usedletters = [] 
 var errors = []
function used_already(char, array){
  for(let i = 0; i<array.length; i++){
      if (array[i]==char) return true
  }
  return false
}
document.getElementById('error-msg').style.display = "none";
window.onkeypress = function(x){
  buttonpressed = x.key
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
  };