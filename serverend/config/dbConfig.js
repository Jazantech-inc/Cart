const mongoose = require("mongoose");
mongoose.connect(process.env.mongo_uri);
const conn = mongoose.connection;

conn.on("connected", ()=>{
    console.log("Mongodb Connection Successful!!");
});
conn.on("error", (err)=>{
    console.log("Mongodb Connection Failed!!");
});

module.exports = conn;