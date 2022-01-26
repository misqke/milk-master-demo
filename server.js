require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const connectDB = require("./db/connectDB");
const authenticateToken = require("./middleware/auth");

const port = process.env.PORT || 8000;
const app = express();

// import routers
const milksRouter = require("./routes/milks");
const authRouter = require("./routes/auth");
const submitsRouter = require("./routes/submits");

// connect to db
connectDB(process.env.DB);

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client/build")));

// cors
const corsOptions =
  process.env.NODE_ENV === "development"
    ? { origin: "*" }
    : { origin: "https://milk-master-demo.herokuapp.com/" };
app.use(cors(corsOptions));

//routes
app.use("/api/milks", authenticateToken, milksRouter);
app.use("/api/auth", authRouter);
app.use("/api/submits", authenticateToken, submitsRouter);

// client
app.get("/*", async (req, res, next) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

// start server
app.listen(port, () => console.log(`server running on port: ${port}...`));
