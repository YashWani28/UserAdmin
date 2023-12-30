const express = require("express");
const connectDb = require('./config/db');
const result = require('dotenv').config();
const { errorHandler } = require("./middleware/errorHandler");


const app = express();
const PORT = 8080;

connectDb();
app.use(express.json());

app.use("/api/users",require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`App is listening on port: ${PORT}`);
})
