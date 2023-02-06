const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const bodyParser = require("body-parser");

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();

app.use(cors());
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
// Connection URL
// const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.of9yidv.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
const uri =
	"mongodb+srv://admin:Pw9Zzz1OZ0yJflMS@cluster0.of9yidv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});
async function run() {
	try {
		await client.connect();
		console.log("Database connection established");
		const collection = client
			.db(process.env.DATABASE_NAME)
			.collection(process.env.COLLECTION_NAME);
		app.get("/products", (req, res) => {
			collection
				.find({})
				.toArray()
				.then((document) => res.send(document));
		});
		// collection.find({}).toArray((err, res) => {
		// 	console.lob(res);
		// });

		app.post("/addProduct", (req, res) => {
			collection.insertOne(req.body).then(() => {
				console.log("Data added successfully");
				res.send("success!");
			});
		});

		app.get("/product/:id", (req, res) => {
			collection
				.find({ _id: new ObjectId(req.params.id) })
				.toArray()
				.then((document) => {
					res.send(document[0]);
				});
		});

		app.delete("/delete/:id", (req, res) => {
			console.log(req.params.id);
			collection
				.deleteOne({
					_id: new ObjectId(req.params.id),
				})
				.then((response) => console.log(response));
		});

		// collection.insertOne({ name: "modhu", price: 25, quantity: 3 }).then((result) => console.log(result));
	} catch (err) {
		console.log(err);
	}
}
run();
app.listen(PORT, () => {
	console.log("listening on port " + PORT);
});
