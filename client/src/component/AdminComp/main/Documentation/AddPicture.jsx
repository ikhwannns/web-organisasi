import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPicture = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const savePicture = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    try {
      await axios.post("http://localhost:9900/galery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/documentation");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen bg-slate-200 p-12">
      <div className="p-5 font-poppins rounded-lg bg-white shadow-xl">
        <h1 className="font-bold text-2xl text-center">
          ADD SOME DOCUMENTATION
        </h1>
        <form onSubmit={savePicture}>
          <div className="mt-2">
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Title
            </label>
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
              <input
                type="text"
                className="block flex-1 border-0 bg-transparent py-2 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Documentation Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-5">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Cover photo
            </label>

            <div className="text-center">
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="bg-gray-400 w-72 justify-center items-center p-2 font-semibold rounded-md">
                    Choose Image
                  </span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={loadImage}
                  />
                </label>
                <p className="pl-1 italic text-sm text-gray-400">
                  PNG, JPG, JPEG up to 5MB
                </p>
              </div>
            </div>
          </div>
          {preview ? (
            <figure className="mt-8">
              <img
                src={preview}
                alt="Preview Image"
                className="h-32 hover:h-80 rounded-md hover:w-full object-cover"
              />
            </figure>
          ) : (
            ""
          )}
          <div className="mt-10 flex gap-3">
            <button
              type="submit"
              className="bg-cyan-500 rounded-md hover:bg-cyan-700 p-2"
            >
              Save
            </button>
            <Link
              to={"/documentation"}
              className="bg-teal-400 rounded-md hover:bg-cyan-600 p-2"
            >
              Back To Documentation
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPicture;
