import mongoose from "mongoose";

const connectionsString =
  "mongodb://localhost:27017/course-selling-app-db";

mongoose.connect(connectionsString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

export default db;
