import AppBar from "../../component/AppBar/AppBar";
import "tailwindcss-gradient";
import Footer from "../../component/Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

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

const Structure = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getMembers();
  }, []);

  const getMembers = async () => {
    const response = await axios.get("http://localhost:9900/members");
    setMembers(response.data);
  };
  return (
    <>
      <AppBar />
      <div className=" h-lvh mt-16 lg:mt-20 font-poppins">
        <div className="top-0 left-0 right-0 h-20 lg:h-24 bg-gray-300 flex items-center justify-between px-5 lg:px-24">
          <p className="text-3xl font-medium text-slate-700">Structure</p>
          <div className="flex flex-row space-x-4 -tracking-tight">
            <a href="/" className="text-blue-700">
              Beranda
            </a>
            <span>/</span>
            <span>Structure</span>
          </div>
        </div>
        {positions.map((posisi) => (
          <div
            className="flex flex-col justify-center items-center mt-20 space-y-10"
            key={posisi.id}
          >
            <p className="text-5xl font-semibold text-slate-900 uppercase">
              {posisi.sebagai}
            </p>
            <div className="flex flex-wrap gap-0 lg:gap-10 justify-center items-center">
              {members
                .filter((member) => member.jabatan === posisi.sebagai)
                .map((member) => (
                  <div className="" key={member.uuid}>
                    <div className="flex flex-col space-y-3 justify-center items-center">
                      <div className="rounded-3xl shadow-2xl">
                        <img
                          className="rounded-3xl"
                          src={member.url}
                          alt="img1"
                          style={{
                            height: "19rem",
                            width: "21rem",
                            padding: ".4rem",
                          }}
                        />
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <p className="text-xl">{member.nama}</p>
                        <p>{member.divisi}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div
              className="bg-gradient-to-b from-blue-700 to-white"
              style={{ width: "90%", height: "1rem" }}
            ></div>
          </div>
        ))}

        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Structure;
