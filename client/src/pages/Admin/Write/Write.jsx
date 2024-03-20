import Layout from "../Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../../features/authSlice.js";

const Write = () => {
  const [artikels, setArtikels] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  useEffect(() => {
    getArtikel();
  }, []);

  const getArtikel = async () => {
    const response = await axios.get("http://localhost:9900/artikel");
    setArtikels(response.data);
  };

  const deleteArtikel = async (artikelId) => {
    if (confirm("Are You Sure You Want to Delete This Article?")) {
      try {
        await axios.delete(`http://localhost:9900/artikel/${artikelId}`);
        getArtikel();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Layout>
      <div className="container font-poppins">
        <div className="flex flex-col">
          <div className="mb-2">
            <Link
              to="/addArtikel"
              className="bg-blue-400 hover:bg-blue-600 p-2 rounded-lg flex justify-center items-center w-44 gap-1"
            >
              <AddCircleOutlineRoundedIcon /> Add Artikel
            </Link>
          </div>
          <h1 className="flex justify-center items-center text-4xl mb-2 font-extrabold">
            Artikel
          </h1>
          <div className="flex flex-wrap gap-3">
            {artikels.map((artikel) => (
              <div
                className="flex flex-wrap gap-3 justify-center items-center"
                key={artikel.id}
              >
                <div className="flex flex-col justify-center items-center max-h-[22rem] bg-white text-center p-2 rounded-xl shadow-2xl max-w-72">
                  <img
                    src={artikel.url}
                    alt="Image"
                    className="w-64 h-60 object-cover rounded-xl"
                  />
                  <div className="w-64 mt-2">
                    <h1 className="font-bold text-xs text-wrap">
                      {artikel.judul}
                    </h1>
                    <h1 className="font-semibold text-slate-500">
                      {artikel.penulis}
                    </h1>
                  </div>
                  <div className="flex justify-center gap-3 px-10 items-center mt-3">
                    <Link
                      to={`/edit/${artikel.id}`}
                      className="text-start bg-yellow-400 hover:bg-yellow-600 rounded-xl p-2"
                    >
                      Update
                    </Link>
                    <button
                      className="bg-red-400 hover:bg-red-600 rounded-xl p-2"
                      onClick={() => deleteArtikel(artikel.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Write;
