/* 
    Allows user to click on the on-screen keyboard to enter guesses 
*/

keys = document.getElementsByClassName("kbd-letter")
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
