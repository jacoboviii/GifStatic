// Initial array of items
var itemsArray = ["Manchester United", "Barcelona", "Real Madrid", "Bayern Munich", "Manchester City", "Arsenal", "Chelsea", "Liverpool", "Juventus", "Tottenham Hotpur", "Paris Saint-Germain", "Borussia Dortmund", "A.C Millan", "Atletico Madrid", "West Ham United", "Schalke 04", "Roma", "Inter Milan", "Leicester City", "Napoli"];


// displayItemInfo function re-renders the HTML to display the appropriate content
function displayItemInfo() {

    var item = $(this).attr("data-name");
    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        item + "&api_key=ytCQsNR3EWj9RSmZVW0OqNok0AW3qyDm&limit=10";

    // Creates AJAX call for the specific item button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // Log the response 
        console.log(response);

        var results = response.data;

        // Empty contents of the gifs-display gif
        $("#gifs-display").empty();

        for (var i = 0; i < results.length; i++) {
            // Creating a div with the class "item"
            // Storing the result item's rating
            // Giving the image tag an src attribute of a proprty pulled off the
            // Append the gif-box div to the "#gifs-display" div in the HTML
            var rating = results[i].rating;
            $("#gifs-display").append(
                `<div id="gif-box" class="float-left border m-1">
                <p>Rating: ${rating}</p>
                <img src="${results[i].images.fixed_height_still.url}" data-still="${results[i].images.fixed_height_still.url}" data-animate="${results[i].images.fixed_height.url}" data-state="still" class="gif">
                </div>`
            )
        }
    });

}

// Function for displaying item data
function renderButtons() {
    // Deletes the itemsArray prior to adding new item
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-display").empty();
    // Loops through the array of itemsArray
    for (var i = 0; i < itemsArray.length; i++) {
        // Then dynamicaly generates buttons for each item in the array
        // Adds a class of item to our button
        // Added a data-attribute
        // Provided the initial button text
        // Added the button to the buttons-view div
        $("#buttons-display").append(
            `<button type="button" class="btn btn-info item m-1" data-name="${itemsArray[i]}">${itemsArray[i]}</button>`
        );
    }
}

// This function handles events where the add item button is clicked
$("#add-item-btn").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var item = $("#add-input").val().trim();

    // The item from the textbox is then added to our array
    itemsArray.push(item);

    // Calling renderButtons which handles the processing of our item array
    renderButtons();
});

// Adding click event listeners to all elements with a class of "gif"
$(document).on("click", ".gif", function(){

    //The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})

// Adding click event listeners to all elements with a class of "item"
$(document).on("click", ".item", displayItemInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();