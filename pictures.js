// We need a global variable for Clippy
agent = null;

// Stop an active clippy if there is one and load a new one.
function loadAgent(){
	if(agent){
		agent.stop();
		agent.hide();
	}

	clippy.load('Merlin', function(agent){
		window.agent = agent;
		agent.show();
	});
}


/*
    This function will create a new <script> element, set the src of it to the Library of Congress
    web service's address plus our query and our callback function's name, then append the script
    element to the page causing the browser to request the page from the Library of Congress.

    The Library of Congress is going to perform its search, create a JSON data package, and send us
    back a script that calls the function we told it to call passing in its JSON data package.

    One thing to note is the call to encodeURIComponent which will take care of any spaces or special
    characters in the search term.
*/
function doSearch(term){
    // Create the <script> element
    var searchRequest = document.createElement("script");

    // Set the src of the <script> element (now it's <script src='http://loc.gov/pictures...'></script>
    searchRequest.src='http://loc.gov/pictures/search?fo=json&callback=processResponse&q=' + encodeURIComponent(term);

    // Attach the <script> we created to the page that's loaded in the browser causing it to do some work for us.
    document.body.appendChild(searchRequest);
}


/*
    This is the function that gets called when our data comes back.  We told the Library of Congress to
    call it passing in their data.
*/
function processResponse(data){
    // At this point all of the data from Library of Congress is in the variable named 'data'

    // Get the output div from the document and put it into the variable named outputDiv
    var outputDiv = document.getElementById('photos');

    // The data has an object inside named 'search' which contains information about the results.  One
    // of those bits of information is the number of hits so if the number of hits is less than one
    // tell the user we have nothing for them and leave the function.
    if(data.search.hits < 1){
        outputDiv.innerText = "No results found";
        agent.play('Decline');
        agent.speak("I couldn't find any results for you.");
        agent.play('Alert');
        return;
    }else{
        agent.moveTo(75, (window.innerHeight / 2));
        agent.speak("I found " + data.search.hits + " pictures for you!");
        agent.play('GestureLeft');
        agent.play('Congratulate_2');
    }

    // If we got here then the number of hits is > 0 so if there are already images in the carousel
    // we have to remove all the carousel bits from the output div.  We test the number of children
    // in the output div and if it's more than 0 we call the 'unslick' function and remove all of the
    // children in the div
    if(outputDiv.children.length > 0){
        // Call unslick
        $('.photos').slick('unslick');

        // Empty the output div
        outputDiv.innerHTML = '';
    }

    // The data from Library of Congress has an object inside called 'results'.  This is an array containing
    // details of each search hit.  Here we will loop through each item in that array and for each one create
    // a div containing the title and the image, then add each as a child of the output div.

    // Arrays have a method called forEach that accepts a function which will act on each item of the array
    data.results.forEach(
        function(thing, idx, arr){
            // At this point 'thing' contains one element from the results array

            // Create the div that we will add as a child of the output div
            var aDiv   = document.createElement("div");

            // Create a div to put the image title into, set its class name to 'caption' (see pictures.css),
            // and add the contents of thing.title as the inner text of the div.
            var aTitle = document.createElement("div");
            aTitle.className="caption";
            aTitle.innerText = thing.title;

            // Create an image to put the image itself into, set its class name to 'image' (see pictures.css),
            // and set the src property of the image to the URL of the image for this hit
            var aImg   = document.createElement("img");
            aImg.className="image";
            aImg.src = thing.image.full;

            // Here we add the <img> tag we created and the <div> tag containing the caption
            // as children of the <div> we created at the start of this function
            aDiv.appendChild(aImg);
            aDiv.appendChild(aTitle);

            // Finally we add the <div> containing the picture and the caption to the output div on the page.
            outputDiv.appendChild(aDiv);
        }
    );


    // At this point we've added all of the images in the search results to the output div and it's time to
    // make it into a fancy carousel.  The instructions for the carousel say all we have to do is call the
    // 'slick' method and it shall be done.
    $('.photos').slick({
                         dots: true,
                         infinite: true,
                         speed: 300,
                         slidesToShow: 1,
                         adaptiveHeight: true,
                       });
}


// This function will ask the user to confirm before allowing the page to reload
window.addEventListener("beforeunload",
    function (e) {
        var confirmationMessage = "\\o/";
        e.returnValue = confirmationMessage;
        return confirmationMessage;
    }
);


// This key handler will run a search using the value of the
// object that triggered the event as the search term when
// the enter key is pressed.
function enterKeyHandler(e){
    if(e.keyCode === 13){
        doSearch(e.target.value);
    }
}

function moveAgentToInput(theInput){
    agent.moveTo(75, theInput.offsetTop);
}

// Add a function to the page that will be called when the page finishes loading.
window.addEventListener("load",
    function(){

        // Attach an event listener to the top term input box
        document
            .getElementById("topTerm")
            .addEventListener("keypress", enterKeyHandler);

        document
            .getElementById("topTerm")
            .addEventListener("focus",    function(e) {moveAgentToInput(e.target); } );

        // Attach an event listener to the bottom term input box
        document
            .getElementById('bottomTerm')
            .addEventListener('keypress', enterKeyHandler);

        document
            .getElementById('bottomTerm')
            .addEventListener("focus",    function(e) {moveAgentToInput(e.target); } );

        // Load and show Clippy
        loadAgent();
    }
);



















