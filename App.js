const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoutes = require("./Routes/userRoutes");
dotenv.config({path:"./.env"});
require("./server");


const app = express();
app.use(express.json());

app.use("/user", userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () =>{
    console.log(`listen on port ${port}`);
})

