require("dotenv").config();

var express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var app = express();
// const authRoutes = require('./routes/auth');
const router = require('./routes');

//Middleware
app.use(bodyParser.json());

//Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB"))
  .catch(err => console.error(err));

app.use(router);
// app.use("/api/auth", authRoutes);
// app.get('/', function (req, res) {
//   res.send('hello');
// })

const port = process.env.port || 5000;
app.listen(port, () => console.log(`server is running on ${port}`));

