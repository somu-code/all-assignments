const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.json());

const adminAuthentication = (req, res, next) => {
  const { username, password } = req.headers;
  const admin = ADMINS.find(
    (a) => a.username === username && a.password === password
  );
  if (admin) {
    next();
  } else {
    res.status(403).json({ message: "Admin authentication failed" });
  }
};

const usersAuthentication = (req, res, next) => {
  const { username, password } = req.headers;
  const user = USERS.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(403).json({ message: "User authentication failed" });
  }
};

const ADMINS = [];
const USERS = [];
const COURSES = [];
let courseID = 0;

// Admin routes
app.post("/admin/signup", (req, res) => {
  // logic to sign up admin
  const { username, password } = req.body;
  const admin = ADMINS.find((admin) => {
    return admin.username === username;
  });
  if (admin) {
    return res.status(409).json({ message: "Username already exists" });
  }
  ADMINS.push({
    username,
    password,
  });
  return res.status(200).json({ message: "Admin created successfully" });
});

app.post("/admin/login", adminAuthentication, (req, res) => {
  // logic to log in admin
  res.status(200).json({ message: "Logged in successfully" });
});

app.post("/admin/courses", adminAuthentication, (req, res) => {
  // logic to create a course
  const course = req.body;
  try {
    course.courseID = courseID;
    COURSES.push(course);
    res
      .status(200)
      .json({ message: `Course created successfully, courseID ${courseID}` });
    courseID += 1;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error. Course creation failed" });
  }
});

app.put("/admin/courses/:courseId", adminAuthentication, (req, res) => {
  // logic to edit a course
  try {
    const courseID = parseInt(req.params.courseId);
    const selectedCource = COURSES.find(
      (course) => course.courseID === courseID
    );
    if (selectedCource) {
      Object.assign(selectedCource, req.body);
      res.status(200).json({ message: `Course ${courseID} updated.` });
    } else {
      res.status(404).json({ message: "Course does not exists." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error. Updating course failed." });
  }
});

app.get("/admin/courses", adminAuthentication, (req, res) => {
  // logic to get all courses
  try {
    res.status(200).json(COURSES);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

// User routes
app.post("/users/signup", (req, res) => {
  // logic to sign up user
  const user = { ...req.body, purchasedCourses: [] };
  try {
    const currentUser = USERS.find((u) => u.username === user.username);
    if (currentUser) {
      return res.status(409).json({ message: "Username already exists." });
    }
    USERS.push(user);
    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

app.post("/users/login", usersAuthentication, (req, res) => {
  // logic to log in user
  try {
    res.status(200).json({ message: `logged in successfully.` });
  } catch (error) {
    res.status(500).json({ message: `Internal server error` });
  }
});

app.get("/users/courses", usersAuthentication, (req, res) => {
  res.status(200).json({ message: COURSES.filter((c) => c.published) });
});

app.post("/users/courses/:courseId", usersAuthentication, (req, res) => {
  // logic to purchase a course
  try {
    const courseID = Number(req.params.courseId);
    const course = COURSES.find(
      (c) => c.courseID === courseID && c.published === true
    );
    if (course) {
      req.user.purchasedCourses.push(courseID);
      res.status(200).json({
        message: `Course ${courseID} purchased successfully`,
      });
    } else {
      res.status(404).json({ message: "Course not found or not avaliable" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/users/purchasedCourses", usersAuthentication, (req, res) => {
  // logic to view purchased courses
  try {
    // const purchasedCourseIds = req.user.purchasedCourses;
    // const purchasedCourses = [];
    // for (let i = 0; i< COURSES.length; i++) {

    // }
    const purchasedCourses = COURSES.filter((c) =>
      req.user.purchasedCourses.includes(c.courseID)
    );
    res.status(200).json({
      message: purchasedCourses,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
