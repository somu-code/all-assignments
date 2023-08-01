import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import AddCourse from "./pages/AddCourse";
import Courses from "./pages/Courses";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/signup" element={<Signup />} />
        <Route path="/admin/signin" element={<Signin />} />
        <Route path="/admin/add-course" element={<AddCourse />} />
        <Route path="/admin/courses" element={<Courses />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
