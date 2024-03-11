const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gfnwb7o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


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


        const complatedEvent = client.db("hopehues").collection("event");
        const upCommingEvent = client.db("hopehues").collection("upcommingevent");

        app.get('/event', async (req, res) => {
            const result = await complatedEvent.find().toArray();
            res.send(result);
        })
        app.get('/upcommingevent', async (req, res) => {
            const upEvent = await upCommingEvent.find().toArray();
            res.send(upEvent);
        })


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("simple running hopehues website")
})

app.listen(port, () => {
    console.log(`hope hues is running ${port}`)
})