/*
    Checking whether player input is an Alphabet or not
*/

function isLetter(c) {
    alphabets = 'abcdefghijklmnopqrstuvwxyz'.split("")
    for(let i = 0; i<alphabets.length; i++){
        if (c==alphabets[i]) return true
    }
    return false
}

/*
    Checking whether player input has already been guessed or not
*/

function used_already(char, array){
    for(let i = 0; i<array.length; i++){
        if (array[i]==char) return true
    }
    return false
}

/*
    Gives Error Messages as per above conditions
*/

document.getElementById('error-msg').style.display = "none";
document.getElementById('letter-form').addEventListener("submit", function(e){
    letter = document.getElementById("letter").value
    document.getElementById('error-msg').style.display = "none";
    
    if(isLetter(letter) == false)document.getElementById('error-msg').style.display = "block";
    if(used_already(letter, usedletters)) document.getElementById('error-msg').style.display = "block";
    usedletters.push(letter)

});
