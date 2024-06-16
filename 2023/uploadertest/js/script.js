// Get the form element
var form = document.getElementById("upload-form");

// Get the progress bar element
var progressBar = document.getElementById("upload-progress");

// Get the status div element
var statusDiv = document.getElementById("upload-status");

// Listen for the form submit event
form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the form data
    var formData = new FormData(form);

    // Create a new XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // Listen for the load event
    xhr.addEventListener("load", function() {
        var response = JSON.parse(xhr.responseText);
        console.log(response);
        if (response.status === "success") {
            progressBar.value = 100;
            statusDiv.innerHTML = "File uploaded successfully";
            statusDiv.classList.add("success");
        } else {
            progressBar.value = 0;
            statusDiv.innerHTML = response.message;
            statusDiv.classList.add("error");
        }
    });

    // Listen for the progress event
    xhr.upload.addEventListener("progress", function(event) {
        if (event.lengthComputable) {
            var percentComplete = (event.loaded / event.total) * 100;
            progressBar.value = percentComplete;
        }
    });

    // Open the request
    xhr.open("POST", form.action);

    // Send the request
    xhr.send(formData);
});
