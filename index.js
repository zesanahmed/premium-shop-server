const express = require('express');
const cors = require("cors");
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = 5000;

const corsConfig = {
  origin: '',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}
app.use(cors(corsConfig))
app.options("", cors(corsConfig))
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.avk97us.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const phoneDB = client.db("phoneDB");
    const phoneCollection = phoneDB.collection("phoneCollection");



    app.post("/phones",async (req,res) => {
      const phoneData = req.body;
      const result = await phoneCollection.insertOne(phoneData);
      res.send(result)
    })

    app.get("/phones",async (req,res) => {
      const phoneData = phoneCollection.find();
      const result = await phoneData.toArray();
      res.send(result)
    })


    console.log("Database is connected");
  } finally {
    // await client.close();
  }
}
run().catch(console.log);



app.get('/',(req,res) => {
    res.send('Route is working')
});

app.listen(port,(req,res) => {
    console.log("App is listening on port" ,port)
})




