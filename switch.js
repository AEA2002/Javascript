
var userData = "red";

if(userData == "red"){
    console.log("you typed 'red'");
}
if(userData == "blue"){
    console.log("you typed 'blue'");
}

function doSwitch(userData){
    switch(userData){
        case "red":
            console.log("you typed 'red'.");
            break;

        case "blue":
            console.log("you typed 'blue'");
            break;

        default:
            console.log("you typed something");
    }
}