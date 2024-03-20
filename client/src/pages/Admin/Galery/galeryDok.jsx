import Layout from "../Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../../features/authSlice.js";

const GaleryDok = () => {
  const [galerys, setGalerys] = useState([]);
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
    getGalerys();
  }, []);

  const getGalerys = async () => {
    const response = await axios.get("http://localhost:9900/galery");
    setGalerys(response.data);
  };

  const deletePicture = async (pictId) => {
    if (confirm(`Apakah Anda Yakin Ingin Menghapus Foto Ini?`)) {
      try {
        await axios.delete(`http://localhost:9900/galery/${pictId}`);
        getGalerys();
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
              to="/addPicture"
              className="bg-blue-400 hover:bg-blue-600 p-2 rounded-lg flex justify-center items-center w-56 gap-1"
            >
              <AddCircleOutlineRoundedIcon /> Add Some Picture
            </Link>
          </div>
          <h1 className="flex justify-center items-center text-4xl mb-2 font-extrabold">
            Galery Documentation
          </h1>
          <div className="flex flex-wrap gap-3">
            {galerys.map((galery) => (
              <div
                className="flex flex-wrap gap-3 justify-center items-center"
                key={galery.uuid}
              >
                <div className="flex flex-col bg-white text-center p-2 rounded-xl shadow-2xl">
                  <img
                    src={galery.url}
                    alt="Image"
                    className="w-64 h-60 object-cover rounded-xl"
                  />
                  <div className="w-64 mt-2">
                    <h1 className="font-bold text-base">{galery.title}</h1>
                  </div>
                  <div className="flex justify-center px-10 items-center mt-3">
                    {/* <Link
                      to={`/editProkers/${galery.uuid}`}
                      className="text-start bg-yellow-400 hover:bg-yellow-600 rounded-xl p-2"
                    >
                      Update
                    </Link> */}
                    <button
                      className="bg-red-400 hover:bg-red-600 rounded-xl p-2"
                      onClick={() => deletePicture(galery.uuid)}
                    >
                      <DeleteForeverIcon />
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

export default GaleryDok;
