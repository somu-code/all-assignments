import { useState } from "react";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [published, setPublished] = useState(false);
  console.log(published);
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-slate-300 p-6 gap-4 rounded-xl w-2/5"
      >
        <h3 className="text-center font-semibold text-[#2866df]">Add course</h3>
        <input
          type="text"
          name="title"
          id="courseTitle"
          placeholder="Title"
          className="pl-2 py-2 rounded-md focus:outline-blue-500"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
        <input
          type="text"
          name="description"
          id="courseDescription"
          placeholder="Description"
          className="pl-2 py-2 rounded-md focus:outline-blue-500"
          onChange={(event) => setDescription(event.target.value)}
          value={description}
        />
        <input
          type="number"
          name="price"
          id="coursePrice"
          placeholder="Price"
          className="pl-2 py-2 rounded-md focus:outline-blue-500"
          onChange={(event) => setPrice(event.target.value)}
          value={price}
        />
        <div className="bg-white py-2 rounded-md px-2 flex flex-row justify-between items-center">
          <label htmlFor="coursePublished">Published</label>
          <select
            name="published"
            id="coursePublished"
            onChange={(event) => setPublished(event.target.value)}
            value={published}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="bg-white py-2 rounded-md px-2 flex flex-row justify-between items-center">
          <label htmlFor="courseImage">
            Course Thumbnail (maximum file size 15MB)
          </label>
          <input
            type="file"
            name="image"
            id="courseImage"
            accept="image/*"
            capture="user"
            className="pl-4"
          />
        </div>
        <button
          type="submit"
          className="bg-[#2866df] text-white font-semibold py-2 rounded-md hover:bg-[#215ac8]"
        >
          Add course
        </button>
      </form>
    </div>
  );
}

export default AddCourse;
