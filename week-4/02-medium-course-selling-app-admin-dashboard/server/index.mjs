import express, { json } from "express";
const app = express();
import cors from "cors";
import db from "./db.mjs";
const PORT = 3000;

import dotenv from "dotenv";
import Admin from "./models/admin-model.mjs";
import { generateAdminJWT } from "./jwt-auth/admin-auth.mjs";
dotenv.config();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(json());

app.post("/admin/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (admin) {
      res.status(403).json({ message: "Admin email already exists" });
    } else {
      const newAdmin = new Admin({ email, password });
      await newAdmin.save();
      const adminToken = generateAdminJWT(email);
      res.json({ message: "Admin created successfully", token: adminToken });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(3000, () => {
  console.log(`Express server listening on http://localhost:${PORT}`);
});
