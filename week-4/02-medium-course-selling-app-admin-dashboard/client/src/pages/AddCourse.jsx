import { useState } from "react";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [published, setPublished] = useState(true);
  const [imageURL, setImageURL] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/admin/add-course", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        price,
        published,
        imageURL,
      }),
    });
    setTitle("");
    setDescription("");
    setPrice("");
    setPublished(true);
    setImageURL("");
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
          required
          className="pl-2 py-2 rounded-md focus:outline-blue-500"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
        <input
          type="text"
          name="description"
          id="courseDescription"
          placeholder="Description"
          required
          className="pl-2 py-2 rounded-md focus:outline-blue-500"
          onChange={(event) => setDescription(event.target.value)}
          value={description}
        />
        <input
          type="number"
          name="price"
          id="coursePrice"
          placeholder="Price"
          required
          className="pl-2 py-2 rounded-md focus:outline-blue-500"
          onChange={(event) => setPrice(event.target.value)}
          value={price}
        />
        <div className="bg-white py-2 rounded-md px-2 flex flex-row justify-between items-center">
          <label htmlFor="coursePublished">Published</label>
          <select
            name="published"
            id="coursePublished"
            required
            onChange={(event) => setPublished(event.target.value)}
            value={published}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <input
          type="url"
          name="imageURL"
          id="imageURL"
          placeholder="Image URL"
          required
          onChange={(event) => setImageURL(event.target.value)}
          value={imageURL}
          className="bg-white py-2 rounded-md px-2"
        />
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
