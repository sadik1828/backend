const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoutes = require("./Routes/userRoutes");
const incidentRoutes = require("./Routes/incidentRoutes");
const offenseRoutes = require("./Routes/offenseRoutes");

dotenv.config({path:"./.env"});
require("./server");


const app = express();
app.use(cors())
app.use(express.json());

app.use("/user", userRoutes);
app.use("/incident", incidentRoutes);
app.use("/offense", offenseRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () =>{
    console.log(`listen on port ${port}`);
})

