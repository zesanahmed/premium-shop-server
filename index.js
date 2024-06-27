const express = require('express');
const cors = require("cors");
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.avk97us.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

let client;
async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    console.log("Database is connected");
  }
  return client;
}

app.post("/phones", async (req, res) => {
  try {
    const client = await connectToDatabase();
    const phoneDB = client.db("phoneDB");
    const phoneCollection = phoneDB.collection("phoneCollection");
    const phoneData = req.body;
    const result = await phoneCollection.insertOne(phoneData);
    res.send(result);
  } catch (error) {
    console.error("Error inserting phone data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.get("/phones", async (req, res) => {
  try {
    const client = await connectToDatabase();
    const phoneDB = client.db("phoneDB");
    const phoneCollection = phoneDB.collection("phoneCollection");
    const phoneData = phoneCollection.find();
    const result = await phoneData.toArray();
    res.send(result);
  } catch (error) {
    console.error("Error fetching phone data:", error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  res.send('Route is working');
});

app.listen(port, () => {
  console.log("App is listening on port", port);
});
