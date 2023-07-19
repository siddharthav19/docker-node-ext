const express = require("express");
const app = express();
const cors = require("cors");
const compilerRouter = require("./routes/compilerRouter");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/compiler", compilerRouter);

app.listen(5000, () => console.log("server at " + "http://localhost:5000/"));
