// Initial array of items
var items = ["Infantry","Ricky Bobby", "Mercenaries", "Iraqi Fails", "Obama fails", "Marines", "Texas", "Pflugerville", "Tanks" , "Tractors", "Emerica","Warped Tour"];

// Function for displaying item data
function renderButtons() {
  // Deleting the item buttons prior to adding new item buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#buttons-view").empty();
  // Looping through the array of items
  for (var i = 0; i < items.length; i++) {
    var add = $("<button>");
    add.attr("data-item", items[i]);
    add.text(items[i]);
    $("#buttons-view").append(add);
    }
}

// This function handles events where one button is clicked
$("#add-item").on("click", function(event) {
  event.preventDefault();
  var item = $("#item-input").val().trim();
  $("#item-input").val("");
  $("#item-input").addClass("america");
  items.push(item);
  renderButtons();
});
  // Calling the renderButtons function at least once to display the initial list of items
  renderButtons();
// Event listener for all button elements
$("body").on("click", "button", function() {
      // In this case, the "this" keyword refers to the button that was clicked
      var item = $(this).attr("data-item");
      // Constructing a URL to search Giphy for the name of the item who said the quote
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        item + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

      // Performing our AJAX GET request
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After the data comes back from the API
        .then(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {
            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div for the gif
              var gifDiv = $("<div>");
                gifDiv.addClass("data-item");
              // Storing the result item's rating
              var rating = results[i].rating;
              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);
              // Creating an image tag
              var itemImage = $("<img>");
              $(itemImage).addClass("photo")
              $(itemImage).attr("data-fixed", results[i].images.fixed_height_still.url);
              $(itemImage).attr("data-animated", results[i].images.fixed_height.url);
              $(itemImage).attr("data-state", "still");
              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              itemImage.attr("src", results[i].images.fixed_height_still.url);
              console.log(results[i]);
                $(itemImage).click(function() {
                  if ($(this).attr("data-state")==="still") {
                    $(this).attr("data-state", "animated");
                    var animatedSource = $(this).attr("data-animated")
                    $(this).attr("src", animatedSource)
                  } else { 
                    $(this).attr("data-state", "still");
                    var stillSource = $(this).attr("data-fixed")
                    $(this).attr("src", stillSource)
                    // block of code to be executed if the condition is false
                  }
                }); 
              }
              // Appending the paragraph and itemImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(itemImage); 
              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifs-appear-here").prepend(gifDiv);
            }
          }
)});
 
    