function Math(height){
    var leftover = height - 240;

    return (leftover)
}

function myFunction(){
    // Get the height of the web page
    var pageHeight = document.documentElement.clientHeight;

    var leftover = Math(pageHeight)

    // Display the page height in the console
    console.log("Page height: " + pageHeight + " pixels " + leftover);
    }
    
setInterval(myFunction, 100);