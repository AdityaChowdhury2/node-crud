const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const bodyParser = require("body-parser");

const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");

const app = express();

app.use(cors());
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
// Connection URL
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.of9yidv.mongodb.net/?retryWrites=true&w=majority`;
// const url ="mongodb+srv://admin:Pw9Zzz1OZ0yJflMS@cluster0.of9yidv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const dbConnect = async () => {
	try {
		await client.connect();
		console.log("Connection successful");
	} catch (err) {
		console.log(err);
	}
};
dbConnect();

app.get("/", (req, res) => {
	res.send({ title: "Welcome to my New MongoDB site!" });
});
// mongoose.set("strictQuery", true);

// mongoose.connect(uri).then(() => {
app.listen(PORT, () => {
	console.log("listening on port " + PORT);
});
// });
