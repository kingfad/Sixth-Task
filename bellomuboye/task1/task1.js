function getData (url) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true)
	xhr.onload = function () {
		var data = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr status == '200') {
			console.log(data);
		} else {
			console.error(data);
		}
	}
	xhr.send(null);
}

function getAData (url, id) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', `${url}/${id}`, true)
	xhr.onload = function () {
		var data = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr status == '200') {
			console.log(data);
		} else {
			console.error(data);
		}
	}
	xhr.send(null);
}

function postData (url, newData) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	xhr.onload = function () {
		var data = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr status == '200') {
			console.log(data);
		} else {
			console.error(data);
		}
	}
	xhr.send(JSON.stringify(newData));	
}

function updateData (url, id, updatedData) {
	var xhr = new XMLHttpRequest();
	xhr.open('PUT', `${url}/${id}`, true);
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	xhr.onload = function () {
		var data = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr status == '200') {
			console.log(data);
		} else {
			console.error(data);
		}
	}
	xhr.send(JSON.stringify(updatedData));	
}

function deleteAUser (url, id) {
	var xhr = new XMLHttpRequest();
	xhr.open('DELETE', `${url}/${id}`, true)
	xhr.onload = function () {
		var data = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr status == '200') {
			console.log(data);
		} else {
			console.error(data);
		}
	}
	xhr.send(null);
}