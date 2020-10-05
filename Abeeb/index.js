// Create an XMLHttpRequest object
const xhr = new XMLHttpRequest();

// The readyState represent the current state of the request
/*
0=unsent
1=opened
2=headerReceived
3=loading....
4=done
*/

xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    console.log("Request is completed and ready");
    // If request was found (OK)
    if (xhr.status === 200) {
      console.log("Request is OK");
      console.log(xhr.responseText);
    }
    // If request was not found
    if (xhr.status === 404) {
      console.error("Resource not found");
    }
  }
};

// Get request
xhr.open("get", "https://dog.ceo/api/breeds/list/all", true);
// Send request
xhr.send();
