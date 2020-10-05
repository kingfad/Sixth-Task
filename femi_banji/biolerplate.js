//Setup reequest

xhr = new XMLHttpRequest()

//onload
xhr.onload = function () {
  //process return data
  if ((xhr.status = 200 && xhr.staus < 300)) {
    //request successful response
    console.log("success", xhr)
  } else {
    //request fails response
    console.log("request failed")
  }
  console.log("This runs always")
}
xhr.open(req, https)
xhr.send()
