require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;

const app = express();

// config JSON and formdata response

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // para aceitar formdata

// solve cors
app.use(cors({ credentials: true, origin: "https://localhost:3000" }));

//Upload directory
app.use("/upload", express.static(path.join(__dirname, "/uploads")));

// DB connection
require("./config/db.js");

// routes
const router = require("./routes/Router.js");
app.use(router);

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
