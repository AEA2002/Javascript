// Javascript from day 1
var originalText = "";


function say(thingToSay){
    document.body.innerHTML += (thingToSay + "<br />");
}

function sayNew(thingToSay){
    if(originalText == ""){
        originalText = document.body.innerHTML;
    }

    if (typeof thingToSay !== 'undefined') {
        document.body.innerHTML = (originalText + thingToSay + "<br />");
    }else{
        document.body.innerHTML = (originalText);
    }
}

function stutter(thingToSay, numTimes){
    sayNew(); // Clears the screen

    for(i=1; i <= numTimes; i++){
        say(thingToSay + " #" + i); // Writes to the screen
    }
}









