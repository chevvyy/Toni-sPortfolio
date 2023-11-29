// Get a reference to the element where you want to display the scroll position
var scrollPositionElement = document.getElementById("scrollPosition");

// Add an event listener to track scroll position
window.addEventListener("scroll", function() {
    // Get the current scroll position
    var scrollPosition = window.scrollY;
    
    // Update the element with the scroll position
    console.log("Scroll height: " + scrollPosition + " pixels");
});
