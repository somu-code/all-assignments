import React, { useEffect, useState } from "react";

function Courses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/admin/courses", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="max-w-screen-2xl mx-auto mt-8">
      <h1 className="text-center font-medium text-2xl text-[#1E0E62] mb-8">
        Courses
      </h1>
      {courses.map((course) => {
        return (
          <div key={course._id} className="w-80">
            <img src={course.imageURL} alt="" />
            <div className="bg-[#e6f1fc] px-2 pb-1">
              <div className="text-lg font-medium">{course.title}</div>
              <div className="text-justify line-clamp-4">{course.description}</div>
              <div className="text-end font-semibold">Cost ${course.price}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Courses;
