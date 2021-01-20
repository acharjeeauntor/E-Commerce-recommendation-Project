const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var con= require('./routes/connection')


//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Db Config


//DB Connection



//Routes
app.use("/", require("./routes/search"));
app.use("/feedback", require("./routes/feedback"));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server run on port ${port}`));