const express = require("express");
const app = express();

const cors = require("cors");

const port = process.env.PORT || 5000;
const data = require('./sample.json');
// middleware
app.use(cors());
app.use(express.json());


//tanzimnahid6

//iHVG5Qml9EspzQvD

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://tanzimnahid6:iHVG5Qml9EspzQvD@cluster0.3wyvi0w.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const todoCollection = client.db('todoApp').collection('todo')
    //get all task======================================
    app.get('/todo',async (req,res)=>{
      const todo = await todoCollection.find().toArray()
      res.send(todo)
    })


    //get task by user wise===============================
    app.get('/todo/:email',async (req,res)=>{
      const email =req.params.email
      const query = { email: email};
      const cursor = await todoCollection.find(query).toArray()
      res.send(cursor)
    })

    //post single data==========================================
    app.post('/todo',async (req,res)=>{
      const task = req.body 
      const result = await todoCollection.insertOne(task)
      console.log(result);
      res.send(result)
    })

    //delete item=====================================================
    app.delete('/todo/:id',async (req,res)=>{
      const id = req.params.id 
      const query = {_id:new ObjectId(id)}
      const result = await todoCollection.deleteOne(query)
      res.send(result)
      
    })

    app.patch('/todo/:id',async (req,res)=>{
      const id = req.params.id
      const filter = { _id: new ObjectId(id) }
      const updatedToy = req.body
      console.log(id);
      console.log(updatedToy);
      const updateDoc = {
        $set: {
          status: updatedToy.status
        },
      };
      const result = await todoCollection.updateOne(filter,updateDoc);
      res.send(result)

     
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);








app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get('/sample',(req,res)=>{
    res.send(data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
