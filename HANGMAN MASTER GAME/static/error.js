function isLetter(c) {
    alphabets = 'abcdefghijklmnopqrstuvwxyz'.split("")
    for(let i = 0; i<alphabets.length; i++){
        if (c==alphabets[i]) return true
    }
    return false
}
/* var usedletters = [] */
function used_already(char, array){
    for(let i = 0; i<array.length; i++){
        if (array[i]==char) return true
    }
    return false
}
document.getElementById('error-msg').style.display = "none";
document.getElementById('letter-form').addEventListener("submit", function(e){
    letter = document.getElementById("letter").value
    document.getElementById('error-msg').style.display = "none";
    if(isLetter(letter) == false)document.getElementById('error-msg').style.display = "block";
    if(used_already(letter, usedletters)) document.getElementById('error-msg').style.display = "block";
    usedletters.push(letter)

});