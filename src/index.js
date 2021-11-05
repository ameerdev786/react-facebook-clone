const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const categoryRoute = require("./routes/category");
const authRoute = require("./routes/auth");
const adminAuthRoute = require("./routes/admin/auth");
const initialData = require("./routes/admin/initialData");
const productRoute = require("./routes/product");
const cartRoute= require("./routes/cart");
const path= require("path")

mongoose
  .connect(
    "mongodb+srv://ameer:se11se11@cluster0.kodnx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("database is connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(cors());
app.use(express.json());
app.use("/public",express.static(path.join(__dirname,"uploads")));
app.use("/api", categoryRoute);
app.use("/api", authRoute);
app.use("/api", adminAuthRoute);
app.use("/api", productRoute);
app.use("/api", cartRoute);
app.use("/api", initialData);
app.get('/',(req,res)=>{
    res.send("from me ameer hamza")
})

const Port = process.env.PORT || 2000;
app.listen(Port, () => {
  console.log(`server is running on port ${Port} `);
})
