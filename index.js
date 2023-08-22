require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ahkgffp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// Connect to the MongoDB database
const run = async () => {
  try {
    await client.connect();
    console.log("Connected to the database");

    const db = client.db("book-server");
    const bookCollection = db.collection("books");

    // Get all books
    app.get("/books", async (req, res) => {
      try {
        const books = await bookCollection.find().toArray();
        res.json(books);
      } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ message: "Error fetching books", error });
      }
    });

    // Add a new book
    app.post("/books", async (req, res) => {
      const book = req.body;
      const result = await bookCollection.insertOne(book);
      res.send(result);
    });

    // Get a single book by ID
    app.get("/books/:id", async (req, res) => {
      const id = req.params.id;
      const result = await bookCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // Add a review to a book
    app.post("/books/:id/reviews", async (req, res) => {
      try {
        const bookId = req.params.id;
        const review = req.body.review;
        
        const result = await bookCollection.updateOne(
          { _id: new ObjectId(bookId) },
          { $push: { reviews: review } }
        );

        if (result.modifiedCount === 0) {
          return res.status(404).json({ message: "Book not found" });
        }

        res.status(204).send();
      } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ message: "Error adding review", error });
      }
    });

    // Get reviews for a book
    app.get("/books/:id/reviews", async (req, res) => {
      try {
        const bookId = req.params.id;
        const result = await bookCollection.findOne({
          _id: new ObjectId(bookId),
        });

        if (!result) {
          return res.status(404).json({ message: "Book not found" });
        }

        res.json(result.reviews || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Error fetching reviews", error });
      }
    });

    app.delete("/books/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const result = await bookCollection.deleteOne({
          _id: new ObjectId(id),
        });

        if (result.deletedCount === 0) {
          return res.status(404).json({ message: "Book not found" });
        }

        res.status(204).send();
      } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ message: "Error deleting book", error });
      }
    });

  } finally {
    // Close the database connection when done
    // await client.close();
  }
};

run().catch((err) => console.log(err));

// Default route
app.get("/", (req, res) => {
  res.send("Book API is up and running!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
