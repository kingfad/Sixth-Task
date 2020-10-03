const path = require("path");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

class BookDirectoryController {
  static async testRoute(req, res) {
    // try {
    //     // fs.readFile(path.join(__dirname, '../store', 'store.js'), 'utf8', (err, data) => {
    //     //     if (err) throw err;
    //     //     fs.writeFile(path.join(__dirname, '../store', 'store.json'), JSON.stringify(data), err => {
    //     //         if(err) throw err;
    //     //         console.log('done');
    //     //     })
    //         res.send('hello');
    //     }
    // } catch (err) {
    //     console.log(err)
    // }
    // try {
    //     let data = await fs.readFile(path.join(__dirname, '../store', 'store.json'),'utf8');
    //     console.log(data);
    //     res.send('hello');
    // } catch (err) {
    //     console.log(err)
    // }
  }

  static async getAllBooks(req, res) {
    try {
      let data = await fs.readFile(
        path.join(__dirname, "../store", "store.json")
      );

      let parsedData = JSON.parse(data);

      return res.status(200).json({
        status: "Success",
        data: parsedData,
      });
    } catch (err) {
      res.status(500).json({
        status: "Failed",
        message: "Server error",
      });
    }
  }

  static async getOneBook(req, res) {
    try {
      let urlId = req.params.id;
      if (!urlId) {
        return res.status(400).json({
          status: "Failed",
          message: "Book ID is needed",
        });
      }

      let data = await fs.readFile(
        path.join(__dirname, "../store", "store.json")
      );

      let parsedData = JSON.parse(data);

      if (parsedData[urlId] === undefined) {
        return res.status(404).json({
          status: "Failed",
          message: "Book not found",
        });
      }

      let requestedBook = parsedData[urlId];

      return res.status(200).json({
        status: "Success",
        data: requestedBook,
      });
    } catch (err) {
      res.status(500).json({
        status: "Failed",
        message: "Server error",
      });
    }
  }

  static async postBook(req, res) {
    try {
      let bookName = req.body.name;
      let id = uuidv4();

      let data = await fs.readFile(
        path.join(__dirname, "../store", "store.json")
      );
      let parsedData = JSON.parse(data);

      parsedData[id] = bookName;

      let newData = await fs.writeFile(
        path.join(__dirname, "../store", "store.json"),
        JSON.stringify(parsedData)
      );

      return res.status(200).json({
        status: "Success",
        message: "Book stored successfully",
      });
    } catch (err) {
      res.status(500).json({
        status: "Failed",
        message: "Server error",
      });
    }
  }

  static async updateBook(req, res) {
    try {
      let urlId = req.params.id;
      let newName = req.body.name;
      if (!urlId || !newName) {
        return res.status(400).json({
          status: "Failed",
          message: "Complete details needed",
        });
      }

      let data = await fs.readFile(
        path.join(__dirname, "../store", "store.json")
      );

      let parsedData = JSON.parse(data);

      if (parsedData[urlId] === undefined) {
        return res.status(404).json({
          status: "Failed",
          message: "Book not found",
        });
      }

      parsedData[urlId] = newName;

      let newData = await fs.writeFile(
        path.join(__dirname, "../store", "store.json"),
        JSON.stringify(parsedData)
      );

      return res.status(200).json({
        status: "Success",
        message: "Book updated successfully",
      });
    } catch (err) {
      res.status(500).json({
        status: "Failed",
        message: "Server error",
      });
    }
  }

  static async deleteBook(req, res) {
    try {
      let urlId = req.params.id;
      if (!urlId) {
        return res.status(400).json({
          status: "Failed",
          message: "Book ID needed",
        });
      }

      let data = await fs.readFile(
        path.join(__dirname, "../store", "store.json")
      );

      let parsedData = JSON.parse(data);

      if (parsedData[urlId] === undefined) {
        return res.status(404).json({
          status: "Failed",
          message: "Book not found",
        });
      }

      delete parsedData[urlId];

      let newData = await fs.writeFile(
        path.join(__dirname, "../store", "store.json"),
        JSON.stringify(parsedData)
      );

      return res.status(200).json({
        status: "Success",
        message: "Book Deleted",
      });
    } catch (err) {
      res.status(500).json({
        status: "Failed",
        message: "Server error",
      });
    }
  }
}

module.exports = BookDirectoryController;
