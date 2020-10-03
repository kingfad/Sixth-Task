// GET Request
function getData(resourceUri) {    
    let url = resourceUri;
    
    let xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                alert(xhr.responseText);
            } else {
                alert("Request was unsuccessful: " + xhr.status);
            }
        }
    };
    
    // initiate request
    xhr.open("get", url, false);
    xhr.send(null);
}


// POST request
function submitData(resourceUri) {
    let url = resourceUri;

    let xhr = new XMLHttpRequest(); 
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                alert(xhr.responseText);
            } else {
                alert("Request was unsuccessful: " + xhr.status);
            }
        }
    };
    
    // initiate request
    xhr.open("post", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    let form = document.getElementById("user-info"); 
    xhr.send(serialize(form));
}

