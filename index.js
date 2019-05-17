document.getElementById("inputs").addEventListener("submit",function(event) {
 event.preventDefault();
 const imgUrl = document.getElementById("img_url").value;
 if (imgUrl === "") {
     return alert("Please insert an image URL");
 }

 testImage(imgUrl, function(result) {
     if (result === false) {
         return alert("Bad image URL. Please double check your URL and submit again");
     }
     const topText = document.getElementById("top_text").value.toUpperCase();
     const bottomText = document.getElementById("bottom_text").value.toUpperCase();
     console.log(bottomText);
     let element = document.createElement("div");
     element.className = "meme";
     element.addEventListener("click", deleteMeme);
     let theImage = document.createElement("img");
     theImage.src = imgUrl;
     let topTextInput = document.createElement("span");
     topTextInput.textContent = topText;
     topTextInput.className = "memetext top";
     let bottomTextInput = document.createElement("span");
     bottomTextInput.textContent = bottomText;
     bottomTextInput.className = "memetext bottom";
     element.appendChild(theImage);
     element.appendChild(topTextInput);
     element.appendChild(bottomTextInput);
     let overlay = document.createElement("div");
     overlay.className = "overlay";
     let overlayText = document.createElement("div");
     overlayText.className = "overlayText";
     overlayText.textContent = "X";
     overlay.appendChild(overlayText);
     element.appendChild(overlay);
     document.getElementById("meme_container").appendChild(element);
    document.getElementById("img_url").value = "";
    document.getElementById("top_text").value = "";
    document.getElementById("bottom_text").value = ""; 
 });
});

function testImage(url, callback, timeout) {
    timeout = timeout || 5000;
    var timedOut = false, timer;
    var img = new Image();
    img.onerror = img.onabort = function() {
        if (!timedOut) {
            clearTimeout(timer);
            callback(false);
        }
    };
    img.onload = function() {
        if (!timedOut) {
            clearTimeout(timer);
            callback(true);
        }
    };
    img.src = url;
    timer = setTimeout(function() {
        timedOut = true;
        callback(false);
    }, timeout); 
}

function deleteMeme(event) {
    if (event.target.className === "overlayText") {
        event.target.parentNode.parentNode.remove();
    } else {
        event.target.parentNode.remove();
    }
  
    console.log(event);
};