const mongoose = require("mongoose");
mongoose
.connect(`mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@cluster0.cwpvd.mongodb.net/project`)
.then(() => console.log("connected to db"));