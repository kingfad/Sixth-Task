// GET REQUEST
function makeGetRequest(url, yourFunction) {
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      yourFunction(this);
    }
  };

  xhttp.open("GET", url, true);

  xhttp.send();
}

// POST REQUEST
function makePostRequest(url, yourData, yourFunction) {
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      yourFunction(this);
    }
  };

  xhttp.open("POST", url, true);

  xhttp.send(yourData);
}

// PUT REQUEST
function makePutRequest(url, yourData, yourFunction) {
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      yourFunction(this);
    }
  };

  xhttp.open("PUT", url, true);

  xhttp.send(yourData);
}

// DELETE REQUEST
function makeDeleteRequest(url, yourData, yourFunction) {
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      yourFunction(this);
    }
  };

  xhttp.open("DELETE", url, true);

  xhttp.send(yourData);
}
