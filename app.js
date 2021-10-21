const express = require('express')
var bodyParser = require('body-parser');  
var axios = require('axios')
// Create application/x-www-form-urlencoded parser  
//var urlencodedParser = bodyParser.urlencoded({ extended: false }) 

const { MongoClient } = require("mongodb");
const app = express()
const port = 8080

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://admin:admin@cluster0.xubr9.mongodb.net/test";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    const database = client.db("node1");
    const haiku = database.collection("insert1");
    // create a document to insert
    const doc = {
      title: "Record of a node1",
      content: "No bytes, no problem. Just insert a document, in MongoDB",
    }
    const result = await haiku.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

app.post('/app1', (req, res) => {
 
var url = "http://0.0.0.0:49163/app3"
 axios.post(url, req.body)
    .then(data=>console.log(data.data))
    .catch(err => console.log(err))

    res.send("Successfull! on app1")
})



app.listen(port, () => {
  console.log(`Example app listening at http://0.0.0.0:${port}`)
})