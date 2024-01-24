const express = require("express");
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());
require("dotenv").config();
const dbConfig = require("./config/dbConfig");

const port = process.env.port || 4000;

const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const bidsRoute = require("./routes/bidRoute");
const notificationsRoute = require("./routes/notificationsRoute");

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/bids", bidsRoute);
app.use("/api/notifications", notificationsRoute);

/* deployment config */
// const path = require("path");
// __dirname = path.resolve();

// if(process.env.NODE_ENV == "production"){http://localhost:4000
//     app.use(express.static(path.join(__dirname, "/userend/build")));
//     app.get("*", (req,res) => {
//         res.sendFile(path.join(__dirname, "userend", "build", "index.html"))
//     });
// }

app.listen(port, ()=>{ console.log(`Node.js Server is listening on port http://localhost:${port}`)})