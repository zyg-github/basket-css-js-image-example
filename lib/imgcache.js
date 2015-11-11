// zyg
(function () {

var $imgcache =  document.querySelectorAll(".imgcache");
var l = $imgcache.length;
if(l){
    for(var i=0;i < l; i++){


        (function(image,url){

            // localStorage with image
            var storageFiles = JSON.parse(localStorage.getItem("imgcache-"+url)) || {},
                storageFilesDate = storageFiles.date,
                date = new Date(),
                todaysDate = (date.getMonth() + 1).toString() + date.getDate().toString();

            // Compare date and create localStorage if it's not existing/too old   
            if (typeof storageFilesDate === "undefined" || storageFilesDate < todaysDate) {
                // Take action when the image has loaded
                image.addEventListener("load", function () {
                    var imgCanvas = document.createElement("canvas"),
                        imgContext = imgCanvas.getContext("2d");

                    // Make sure canvas is as big as the picture
                    imgCanvas.width = this.width;
                    imgCanvas.height = this.height;

                    // Draw image into canvas element
                    imgContext.drawImage(this, 0, 0, this.width, this.height);

                    // Save image as a data URL
                    storageFiles.data = imgCanvas.toDataURL("image/png");

                    // Set date for localStorage
                    storageFiles.date = todaysDate;

                    imgCanvas = null;

                    // Save as JSON in localStorage
                    try {
                        localStorage.setItem("imgcache-"+url, JSON.stringify(storageFiles));
                    }
                    catch (e) {
                            console.log("Storage failed: " + e);                
                    }
                }, false);

                // Set initial image src    
                image.setAttribute("src", url);
            }else {
                // Use image from localStorage
                image.setAttribute("src", storageFiles.data);
            }


        })($imgcache[i],$imgcache[i].getAttribute("data-url"));


    }
}

})();