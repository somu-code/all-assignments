import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  published: Boolean,
  imageURL: String,
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
