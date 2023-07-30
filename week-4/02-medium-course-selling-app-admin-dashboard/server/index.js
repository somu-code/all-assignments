const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.post("/admin/signup", (req, res) => {
  res.status(200).json({ message: "Response" });
});

app.listen(3000, () => {
  console.log(`Express server listening on http://localhost:${PORT}`);
});
