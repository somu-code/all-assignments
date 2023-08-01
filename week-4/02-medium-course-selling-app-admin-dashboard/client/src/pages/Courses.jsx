import React, { useEffect, useState } from "react";

function Courses() {
  const [courses, setCourses] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/admin/courses", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setCourses(data));
  }, []);
  console.log(courses.map((course) => console.log(course)));
  return (
    <div>
        hello
      {/* {courses
        ? courses.map((course) => {
            <div className="course">
              <h4>{course.title}</h4>
              <p>{course.description}</p>
              <p>{course.price}</p>
              <p>{course.published}</p>
            </div>;
          })
        : null} */}
    </div>
  );
}

export default Courses;
