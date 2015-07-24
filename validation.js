
function validateForm(e){
    var valid = true;
    var errorText = "";

    if(isNothing(document.forms['form1']['firstName'].value)){
        valid = false;
        errorText += "Please enter a first name <br />";
    }

    if(isNothing(document.forms['form1']['lastName'].value)){
        valid = false;
        errorText += "Please enter a last name <br />";
    }

    if(!isInRange(parseInt(document.forms['form1']['age'].value), 18, 80)){
        valid = false;
        errorText += "Age must be between 18 and 80<br />";
    }

    if( document.forms['form1']['color1'].value !=
        document.forms['form1']['color2'].value) {
        valid = false;
        errorText += "Colors must match.<br />";
    }

    if(!valid){
        document.getElementById('errors').innerHTML=errorText;
        e.preventDefault();
    }

}

function isNothing(testValue){
    return (testValue == null)
            || (testValue == "");
}

function isInRange(testValue, floorValue, ceilValue){
    return (testValue != null)
            && (Number.isInteger(testValue))
            && (testValue >= floorValue)
            && (testValue <= ceilValue);
}

window.addEventListener("load",
    function(){
        document.getElementById('form1')
            .addEventListener("submit",
                function(e){ validateForm(e);}
            );
    }
);