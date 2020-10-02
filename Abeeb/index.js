// Create an XMLHttprequest object
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
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    }
    if (xhr.status === 404) {
      console.error("Resource not found");
    }
  }
};

xhr.open("get", "https://dog.ceo/api/breeds/list/all", true);
xhr.send();
