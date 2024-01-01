const { readdirSync } = require("fs");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const connectDB = require("./db/db");

const http = require("http");
const httpServer = http.createServer(app);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Origin",
      "x-access-token",
      "X-Requested-With",
      "Accept",
      "Access-Control-Allow-Headers",
      "Access-Control-Request-Headers",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Methods",
      "Access-Control-Allow-Credentials",
    ],
  })
);
// route
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));
app.get("/", (req, res) => {
  res.send("Welcome to nurman Innovation");
});

app.use(bodyParser.urlencoded({ extended: true }));
connectDB();

// apply middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

httpServer.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
process.on("uncaughtException", function (err) {
  console.log(err);
  console.log("Node Not Exiting...");
});
