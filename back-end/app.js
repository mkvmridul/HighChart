const express = require("express");
const mongoose = require("mongoose");
const dbConnection = require("./config/db");
const cors = require('cors')

const app = express();

dbConnection();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use('/api/advertisement', require('./routes/advertisement'));

app.get('/*', (req,res) => res.json({msg: "404 not found"}));


const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
	console.log(`app is listening to PORT ${PORT}`)
})