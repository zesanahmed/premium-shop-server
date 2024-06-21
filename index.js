const express = require('express');
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://zesanahmed593:sTbv90VXPXwFRrAc@cluster0.avk97us.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
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
app.get('/users',(req,res) => {
    const user = {
      name:"jisan",
      id: 23,
      wsl:"lsdkf"
    }
    res.send(user)
});

app.listen(port,(req,res) => {
    console.log("App is listening on port" ,port)
})


