import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateArtikel = () => {
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getArtikelById();
  }, []);

  const getArtikelById = async () => {
    const response = await axios.get(`http://localhost:9900/artikel/${id}`);
    setTitle(response.data.judul);
    setWriter(response.data.penulis);
    setDesc(response.data.desc);
    setFile(response.data.image);
    setPreview(response.data.url);
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const updateArtikel = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("writer", writer);
    formData.append("desc", desc);
    try {
      await axios.patch(`http://localhost:9900/artikel/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/writeArtikel");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen bg-slate-200 p-12">
      <div className="p-5 font-poppins rounded-lg bg-white shadow-xl">
        <h1 className="font-bold text-2xl text-center">UPDATE YOUR ARTIKEL</h1>
        <form onSubmit={updateArtikel}>
          <div className="mt-2">
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Title
            </label>
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
              <input
                type="text"
                className="block flex-1 border-0 bg-transparent py-2 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Articel Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-2">
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Writer
            </label>
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
              <input
                type="text"
                className="block flex-1 border-0 bg-transparent py-2 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Author"
                value={writer}
                onChange={(e) => setWriter(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-2">
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Description
            </label>
            <div className="mt-2">
              <textarea
                rows={3}
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-2">
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
            <figure className="mt-5">
              <img
                src={preview}
                alt="Preview Image"
                className="h-32 hover:h-80 rounded-md hover:w-full object-cover"
              />
            </figure>
          ) : (
            ""
          )}
          <div className="mt-5 flex gap-3">
            <button
              type="submit"
              className="bg-yellow-300 rounded-md hover:bg-yellow-600 p-2"
            >
              Update
            </button>
            <Link
              to={"/writeArtikel"}
              className="bg-teal-400 rounded-md hover:bg-cyan-600 p-2"
            >
              Back To Artikel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateArtikel;
