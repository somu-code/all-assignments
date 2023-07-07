// To run the mongo docker container "docker run -d --name course-selling-app -p 27017:27017 -d mongo"
// docker run -it --name course-selling-app -p 27017:27017 -v course-selling-app-mongodb-data:/data/database mongo mongosh

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

require("dotenv").config();
app.use(express.json());

// Define mongoose Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

// Define mongoose modles
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

// let ADMINS = [];
// let USERS = [];
// let COURSES = [];

const generateAdminJWT = (username) => {
  const payload = { username, role: "admin" };
  return jwt.sign(payload, process.env.ADMIN_TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
};

const authenticateAdminJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ADMIN_TOKEN_SECRET, (error, user) => {
      if (error) {
        res.sendStatus(403);
      } else {
        next();
      }
    });
  } else {
    sendStatus(403);
  }
};

const generateUserJWT = (username) => {
  const payload = { username, role: "user" };
  return jwt.sign(payload, process.env.USER_TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
};

const authenticateUserJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.USER_TOKEN_SECRET, (error, user) => {
      if (error) {
        res.sendStatus(403);
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    sendStatus(403);
  }
};

mongoose.connect(
  "mongodb+srv://codesomu:QYaxARk4I3UDUudo@cluster0.fpvzzyd.mongodb.net/course-selling-app",
  { dbName: "course-selling-app" }
);

// Admin routes
app.post("/admin/signup", async (req, res) => {
  // logic to sign up admin
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (admin) {
      res.status(403).json({ message: "Admin already exists" });
    } else {
      const newAdmin = new Admin({ username, password });
      await newAdmin.save();
      const adminToken = generateAdminJWT(username);
      res.json({ message: "Admin created successfully", Token: adminToken });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/admin/login", async (req, res) => {
  // logic to log in admin
  try {
    const { username, password } = req.headers;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
      const adminToken = generateAdminJWT(username);
      res.json({ message: "Logged in successfully", Token: adminToken });
    } else {
      res.status(403).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post("/admin/courses", authenticateAdminJWT, async (req, res) => {
  // logic to create a course
  try {
    const course = new Course(req.body);
    await course.save();
    res.json({ message: "Course created successfully", courseId: course.id });
  } catch (error) {
    res.sendStatus(500);
  }
});

app.put("/admin/courses/:courseId", authenticateAdminJWT, async (req, res) => {
  // logic to edit a course
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.courseId,
      req.body,
      {
        new: true,
      }
    );
    if (course) {
      res.json({ message: "Course updated successfully" });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get("/admin/courses", authenticateAdminJWT, async (req, res) => {
  // logic to get all courses
  try {
    const course = await Course.find({});
    res.json({ course });
  } catch (error) {
    res.sendStatus(500);
  }
});

// User routes
app.post("/users/signup", async (req, res) => {
  // logic to sign up user
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ message: "User already exists" });
    } else {
      const newUser = new User({ username, password });
      await newUser.save();
      const userToken = generateUserJWT(username);
      res.json({ message: "User created successfully", Token: userToken });
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post("/users/login", async (req, res) => {
  // logic to log in user
  try {
    const { username, password } = req.headers;
    const user = await User.findOne({ username, password });
    if (user) {
      const userToken = generateUserJWT(username);
      res.json({ message: "Logged in successfully", Token: userToken });
    } else {
      res.status(403).json({ message: "Invalid username or pssword" });
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get("/users/courses", authenticateUserJWT, async (req, res) => {
  // logic to list all courses
  try {
    const course = await Course.find({ published: true });
    res.json({ course });
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post("/users/courses/:courseId", authenticateUserJWT, async (req, res) => {
  // logic to purchase a course
  try {
    const course = await Course.findById(req.params.courseId);
    if (course) {
      const user = await User.findOne({ username: req.user.username });
      if (user) {
        user.purchasedCourses.push(course);
        await user.save();
        res.json({ message: "Course purchased successfully" });
      } else {
        res.status(403).json({ message: "User not found" });
      }
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get("/users/purchasedCourses", authenticateUserJWT, async (req, res) => {
  // logic to view purchased courses
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
