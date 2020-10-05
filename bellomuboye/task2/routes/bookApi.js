const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");


const getBookData = () => {
    const jsonData = fs.readFileSync('books.json')
    return JSON.parse(jsonData)    
}
const saveBookData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('books.json', stringifyData)
}

const existUsers = getBookData();

router.get('/', (req, res) => {
	res.send(existUsers);
});

router.get('/:bookName', (req, res) => {
	let found = existUsers.find(item => item.name === req.params.bookName);
	if (found) {
		res.status(200).json(found);
	} else {
		res.sendStatus(404);
	}
});

router.post('/', (req, res)=> {
	let itemIds = existUsers.map(item => item.id);
	let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;

	const bookData = req.body;
	if (bookData.name === null || bookData.author == null) {
		return res.status(401).send({error: true, msg: 'User data missing'});
	}

	const findExist = existUsers.find(book => book.name === bookData.name);
	if (findExist) {
		return res.status(409).send({error: true, msg: 'book already exists'});
	}

	existUsers.push(bookData);
	saveBookData(existUsers);
	res.send({success: true, msg: 'Book Data added successfully ' + bookName});
});

router.patch('/:bookName', (req, res) => {
	const bookName = req.params.bookName;
	const bookData = req.body;
	const findExist = existUsers.find(book => book.name === bookName);
	if (!findExist) {
		return res.status(409).send({error: true, msg: 'book does not exist'});
	}

	const updateUser = existUsers.filter(book => book.name !== bookName);
	updateUser.push(bookData);
	saveBookData(updateUser);
	res.send({success: true, msg: 'Book Data updated successfully ' + bookName});
});

router.delete('/', (req, res) => {
	const filterUser = existUsers.filter(book => !book.name);
	console.log(filterUser.length)
	if (existUsers.length === filterUser.length) {
		return res.status(409).send({error: true, msg: 'book does not exist'});
	}

	saveBookData(filterUser);
	res.send({success: true, msg: 'all removed successfully '});
})

router.delete('/:bookName', (req, res)=> {
	const bookName = req.params.bookName;
	const filterUser = existUsers.filter(book => book.name !== bookName);
	if (existUsers.length === filterUser.length) {
		return res.status(409).send({error: true, msg: 'book does not exist'});
	}

	saveBookData(filterUser);
	res.send({success: true, msg: 'Book removed successfully ' + bookName});
});






module.exports = router;