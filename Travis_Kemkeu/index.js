const express = require('express');
const parser = require('body-parser');

const app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended : true }));

const hostname = '127.0.0.1';
const port = 3344;
const fs = require('fs');
const file = 'data/books.json';

let book = {
    "id": null,
    "title": null,
    "author": null,
    "editions": null
};
    
    // Get all Books 

app.get('/',(req,res)=>{
    fs.readFile(file,'utf8',(err, data)=>{
        if(err) {
            res.status(400).json({err});
        };
        let _ = JSON.parse(data);
        res.status(200).send(_);
    })
});
        // Get a  book by his id 

app.get('/:id',(req,res)=>{
    let id = req.params.id;
    fs.readFile(file,'utf8',(err, data)=>{
        if(err) {
            res.status(400).send({err});
        };
        let _ = JSON.parse(data);
        let flag = false;
        _.books.forEach(element => {
            if( element.id === id ) {
                res.status(200).send({element});
                flag = true;
            }
        });
        if(!flag){
            res.status(400).send({message : "Bad request."});
        }
    })
});

        // Add book 

app.post('/:add',(req,res)=>{
    let _ = req.body;
    book = {
        "id": null,
    "title": null,
    "author": null,
    "editions": null
    };
    fs.readFile( file, 'utf8', ( err, data )=>{
        if(err) res.status(400).send({ message: err.message });
        else{
            let response = JSON.parse(data);
            let is_exist = false;
            response.books.map(ele => { 
                if (ele.id === book.id) 
                {
                    is_exist = true;
                    return;
                }   
            });
            if( !is_exist ){
                response.books.push(book);
                fs.writeFile( file, JSON.stringify(response), err =>{
                    if(err) 
                    {
                        res.status(401).send({message : err.message});
                    }
                    else {
                        res.status(200).send({message : 'success'});
                    }
                });
            }else{
                res.status(400).send({ message: "ID already exist." });
            }
        }
    })
});
         //Update a book

app.put( '/:update', (req, res) => {
    let _ = req.body;
    book = {
        "id": null,
        "title": null,
        "author": null,
        "editions": null
    };
    fs.readFile( file, 'utf8', ( err, data )=>{
        if(err) res.status(400).send({ message: err.message });
        else{
            let response = JSON.parse(data);
            let is_exist = false;
            let books = response.books;
            response.books.map(ele => { 
                if (ele.id === book.id) 
                {
                    is_exist = true;
                    response.books.pop(ele);
                    response.books.push(book);
                    fs.writeFile( file, JSON.stringify(response), err => {
                        if(err) res.status(400).send({ message : "Book can't be Updated!" });
                        else res.status(200).send({ message : "Book Updated!" });
                    } );
                }   
            });
            if( !is_exist ){
                console.log("Exit");
                res.status(401).send({ message : "Book doesn't exist, please post it!" });
            }
        }
    });
});

        //Delete a book using his id 

app.delete('/delete/:id',(req, res) => {
    let id = req.params.id;
    fs.readFile( file, 'utf8', ( err, data )=>{
        if(err) res.status(400).send({ message: err.message });
        else{
            let response = JSON.parse(data);
            let is_exist = false;
            response.books.map(ele => { 
                if (ele.id === id) 
                {
                    console.log(ele.id, )
                    is_exist = true;
                    response.books.pop(ele);
                    fs.writeFile( file, JSON.stringify(response), err => {
                        if(err) res.status(400).send({ message : "Book can't be deleted!" });
                        else res.status(200).send({ message : "Book Deleted!" });
                    } );
                }   
            });
            if( !is_exist ){
                console.log("Exit");
                res.status(401).send({ message : "Book doesn't exist, please post it!" });
            }
        }
    });
})

app.listen(port, hostname, ()=>{
    console.log(`Server is up and running @${hostname}:${port}`);
});
