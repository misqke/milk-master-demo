require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const port = process.env.PORT || 8000;
const app = express();

// import routers
const milksRouter = require("./routes/milks");
const submitsRouter = require("./routes/submits");

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client/build")));

// cors
const corsOptions =
  process.env.NODE_ENV === "development"
    ? { origin: "*" }
    : { origin: "https://milk-master.herokuapp.com" };
app.use(cors(corsOptions));

//routes
app.use("/api/milks", milksRouter);

app.use("/api/submits", submitsRouter);

// client
app.get("/*", async (req, res, next) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

// start server
app.listen(port, () => console.log(`server running on port: ${port}...`));
