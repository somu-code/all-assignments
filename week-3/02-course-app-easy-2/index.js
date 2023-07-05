const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const generateAdminJWT = (currentAdmin) => {
  const payload = { username: currentAdmin.username };
  return jwt.sign(payload, process.env.ADMIN_TOKEN_SECRET, { expiresIn: "1h" });
};

const authenticateAdminJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ADMIN_TOKEN_SECRET, (error, user) => {
      if (error) {
        res.sendStatus(403);
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.sendStatus(401);
  }
};

const generateUserJWT = (currentUser) => {
  const payload = { username: currentUser.username };
  return jwt.sign(payload, process.env.USER_TOKEN_SECRET, { expiresIn: "1h" });
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
    res.sendStatus(401);
  }
};

// Admin routes

app.post("/admin/signup", (req, res) => {
  // logic to sign up admin
  try {
    const admin = req.body;
    const existingAdmin = ADMINS.find((a) => a.username === admin.username);
    if (existingAdmin) {
      res.status(403).json({ message: "Admin already exists" });
    } else {
      ADMINS.push(admin);
      const adminToken = generateAdminJWT(admin);
      res.json({ message: "Admin created successfully.", adminToken });
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post("/admin/login", (req, res) => {
  // logic to log in admin
  try {
    const admin = req.headers;
    const validAdmin = ADMINS.find(
      (a) => a.username === admin.username && a.password === admin.password
    );
    if (validAdmin) {
      const adminToken = generateAdminJWT(admin);
      res.json({ message: "Logged in successfully", adminToken });
    } else {
      res.status(403).json({ message: "Admin authentication failed" });
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post("/admin/courses", authenticateAdminJWT, (req, res) => {
  // logic to create a course
  try {
    const course = req.body;
    COURSES.push({ ...course, id: COURSES.length + 1 });
    res.json({ message: "Course created successfully", courseId: course.id });
  } catch (error) {
    res.sendStatus(500);
  }
});

app.put("/admin/courses/:courseId", authenticateAdminJWT, (req, res) => {
  // logic to edit a course
  try {
    const courseId = parseInt(req.params.courseId);
    const courseIndex = COURSES.findIndex((c) => c.id === courseId);

    if (courseIndex > -1) {
      const updatedCourse = { ...COURSES[courseIndex], ...req.body };
      COURSES[courseIndex] = updatedCourse;
      res.json({ message: "Course updated successfully" });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get("/admin/courses", authenticateAdminJWT, (req, res) => {
  // logic to get all courses
  res.json({ course: COURSES });
});

// User routes
app.post("/users/signup", (req, res) => {
  // logic to sign up user
  try {
    let user = req.body;
    user = { ...user, purchasedCourses: [] };
    const existingUser = USERS.find((u) => user.username === u.username);
    if (existingUser) {
      res.status(403).json({ message: "User already exist" });
    } else {
      USERS.push(user);
      const userToken = generateUserJWT(user);
      res.json({ message: "User created successfully", userToken });
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post("/users/login", (req, res) => {
  // logic to log in user
  try {
    const user = req.headers;
    const validUser = USERS.find(
      (u) => u.username === user.username && u.password === user.password
    );
    if (validUser) {
      const userToken = generateUserJWT(user);
      res.json({ message: "Logged in successfully", userToken });
    } else {
      res.status(403).json({ message: "User authentication failed" });
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get("/users/courses", authenticateUserJWT, (req, res) => {
  // logic to list all courses
  try {
    res.json({ courses: COURSES.filter((c) => c.published === true) });
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post("/users/courses/:courseId", authenticateUserJWT, (req, res) => {
  // logic to purchase a course
  try {
    const courseId = Number(req.params.courseId);
    const course = COURSES.find(
      (c) => c.id === courseId && c.published === true
    );
    if (course) {
      // req.user.purchasedCourses.push(course);
      USERS.map((u) => {
        if (u.username === req.user.username) {
          u.purchasedCourses.push(course);
        }
      });
      res.json({
        message: "Course purchased successfully",
        courseId: course.id,
      });
    } else {
      res.status(404).json({ message: "Course not found or not avaliable" });
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get("/users/purchasedCourses", authenticateUserJWT, (req, res) => {
  // logic to view purchased courses
  try {
    const user = USERS.find((u) => u.username === req.user.username);
    if (user && user.purchasedCourses) {
      res.json({ purchasedCourses: user.purchasedCourses });
    } else {
      res.status(404).json({ message: "No courses purchased" });
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
