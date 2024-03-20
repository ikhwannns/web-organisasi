import "tailwindcss-gradient";
import AppBar from "../../component/AppBar/AppBar";
import Footer from "../../component/Footer/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "tailwindcss-gradient";

const Proker = () => {
  const [prokers, setProkers] = useState([]);

  useEffect(() => {
    getProkers();
  });

  const getProkers = async () => {
    const response = await axios.get("http://localhost:9900/proker");
    setProkers(response.data);
  };

  return (
    <>
      <div>
        <AppBar />
      </div>
      <div className="font-poppins h-lvh bg-gradient-to-b from-gray-300 to-white flex flex-col">
        <div
          className="flex flex-col justify-center items-center space-y-3 p-3 lg:p-0"
          style={{
            marginTop: "4.5rem",
          }}
        >
          <p className="text-black font-black shadow-2xl text-5xl mt-10 mb-2 transform hover:scale-110 transition duration-300 ease-in-out">
            Work Program
          </p>
          {prokers
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((proker) => (
              <Link to={`/detailProker/${proker.uuid}`} key={proker.uuid}>
                <div className="p-5 mx-auto max-w-full bg-white rounded-xl shadow-2xl flex flex-wrap mt-5 lg:space-x-5 space-y-3 lg:space-y-0 hover:cursor-pointer opacity-100 active:opacity-50 transition duration-300 ease-in-out click:scale-110 md:w-[45rem]">
                  <img
                    src={proker.url}
                    alt="Images Proker"
                    className="h-96 w-96 object-cover rounded-2xl"
                    style={{ width: "26rem" }}
                  />
                  <div className="flex flex-col text-wrap text-justify md:w-60 md:p-0 p-5 gap-2">
                    <p className="text-base font-medium">{proker.title}</p>
                    <p>{proker.time}</p>
                    <p>{proker.divisi}</p>
                    <p>{proker.periode}</p>
                    <p className="text-wrap">
                      {proker.desc.slice(0, 20)}
                      <span className="tracking-widest">...</span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
        <div className="">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Proker;
