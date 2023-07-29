const express = require("express");
const app = express();
const PORT = 3000;

app.post("/admin/signup", (req, res) => {
  console.log(res);
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log(`Express server listening on http://localhost:${PORT}`);
});
