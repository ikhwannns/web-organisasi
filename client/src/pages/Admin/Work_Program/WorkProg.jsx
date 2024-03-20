import Layout from "../Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../../features/authSlice.js";

const WorkProg = () => {
  const [prokers, setProkers] = useState([]);
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
    getProkers();
  }, []);

  const getProkers = async () => {
    const response = await axios.get("http://localhost:9900/proker");
    setProkers(response.data);
  };

  const deleteProker = async (prokerId) => {
    if (confirm(`Apakah Anda Yakin Ingin Menghapus Program Kerja Anda Ini?`)) {
      try {
        await axios.delete(`http://localhost:9900/proker/${prokerId}`);
        getProkers();
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
              to="/addProkers"
              className="bg-blue-400 hover:bg-blue-600 p-2 rounded-lg flex justify-center items-center w-56 gap-1"
            >
              <AddCircleOutlineRoundedIcon /> Add Work Program
            </Link>
          </div>
          <h1 className="flex justify-center items-center text-4xl mb-2 font-extrabold">
            Work Program
          </h1>
          <div className="flex flex-wrap gap-3">
            {prokers.map((proker) => (
              <div
                className="flex flex-wrap gap-3 justify-center items-center"
                key={proker.uuid}
              >
                <div className="flex flex-col justify-center items-center max-h-[22rem] bg-white text-center p-2 rounded-xl shadow-2xl max-w-72">
                  <img
                    src={proker.url}
                    alt="Image"
                    className="w-64 h-60 object-cover rounded-xl"
                  />
                  <h1 className="font-bold text-xs text-wrap">
                    {proker.title}
                  </h1>
                  <h1 className="font-semibold text-slate-500">
                    Periode {proker.periode}
                  </h1>
                  <div className="flex justify-center gap-3 px-10 items-center mt-4">
                    <Link
                      to={`/editProkers/${proker.uuid}`}
                      className="text-start bg-yellow-400 hover:bg-yellow-600 rounded-xl p-2"
                    >
                      Update
                    </Link>
                    <button
                      className="bg-red-400 hover:bg-red-600 rounded-xl p-2"
                      onClick={() => deleteProker(proker.uuid)}
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

export default WorkProg;
