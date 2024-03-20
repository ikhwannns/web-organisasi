import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "tailwindcss-gradient";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../../features/authSlice.js";

const positions = [
  {
    id: 1,
    sebagai: "Presidium",
  },
  {
    id: 2,
    sebagai: "Koordinator",
  },
  {
    id: 3,
    sebagai: "Anggota",
  },
];

const StructureAdmin = () => {
  const [members, setMembers] = useState([]);
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
    getMembers();
  }, []);

  const getMembers = async () => {
    const response = await axios.get("http://localhost:9900/members");
    setMembers(response.data);
  };

  const deleteMembers = async (memberId) => {
    if (confirm("Are You Sure Wan't To Delete This Members")) {
      try {
        await axios.delete(`http://localhost:9900/members/${memberId}`);
        getMembers();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Layout>
      <div className="mb-2">
        <Link
          to="/addMembers"
          className="bg-blue-400 hover:bg-blue-600 p-2 rounded-lg flex justify-center items-center w-56 gap-1"
        >
          Add New Member
        </Link>
      </div>

      {positions.map((position) => (
        <div key={position.id} className="lg:p-0 p-3">
          <h2 className="text-2xl font-bold mb-3 mt-7 text-center uppercase">
            {position.sebagai}
          </h2>
          <table className="w-full text-left bg-gray-100 rounded-tl-3xl rounded-tr-lg shadow border-collapse">
            <thead className="text-center">
              <tr>
                <th className="px-4 py-2 border-b border-gray-300 text-gray-700">
                  Nama
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-gray-700">
                  Divisi
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-gray-700">
                  Image
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-gray-700">
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {members
                .filter((member) => member.jabatan === position.sebagai)
                .map((member) => (
                  <tr
                    className="hover:bg-gray-200 text-center"
                    key={member.uuid}
                  >
                    <td className="border px-4 py-2">{member.nama}</td>
                    <td className="border px-4 py-2">{member.divisi}</td>
                    <td className="border px-4 py-2 flex justify-center items-center">
                      <img
                        src={member.url}
                        alt="Mambers Image"
                        className="text-center w-24 h-24 object-cover rounded-xl"
                      />
                    </td>
                    <td className="border px-4 py-2 md:space-x-3 md:space-y-0 space-y-3">
                      <Link
                        to={`/membersUpdt/${member.uuid}`}
                        className="bg-yellow-300 hover:bg-yellow-600 rounded-xl p-2"
                      >
                        <EditIcon />
                      </Link>
                      <button
                        className="bg-red-400 hover:bg-red-600 rounded-xl p-2"
                        onClick={() => deleteMembers(member.uuid)}
                      >
                        <DeleteForeverIcon />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div
            className="bg-gradient-to-b from-white to-slate-300 w-full"
            style={{ height: "1rem" }}
          ></div>
        </div>
      ))}
    </Layout>
  );
};

export default StructureAdmin;
