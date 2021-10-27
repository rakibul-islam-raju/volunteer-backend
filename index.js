require("dotenv").config();
const { MongoClient } = require("mongodb");
const express = require("express");
const cors = require("cors");

const ObjectId = require("mongodb").ObjectId;

const port = process.env.PORT || 8000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dafwp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

async function run() {
	try {
		await client.connect();
		const databse = client.db("volunteerNetwork");
		const eventsCollection = databse.collection("events");

		// post api
		app.post("/events", async (req, res) => {
			const newEvent = req.body;
			const result = await eventsCollection.insertOne(newEvent);
			res.send(result);
		});
	} finally {
		// await client.close()
	}
}

run().catch(console.dir);

app.get("/", (req, res) => {
	res.send("hello World!");
});

app.listen(port, () => {
	console.log(`Application running on - http://localhost:${port}`);
});
