import AppBar from "../../component/AppBar/AppBar";
import Footer from "../../component/Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
  const [historys, setHistorys] = useState([]);

  async function getHistory() {
    try {
      const response = await axios.get("http://localhost:9900/history");
      setHistorys(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getHistory();
  }, []);
  return (
    <>
      <AppBar />
      <div className="h-lvh flex flex-col min-h-screen bg-white">
        <div className="mt-16 lg:mt-20 font-poppins flex flex-col space-y-20">
          <div className="top-0 left-0 right-0 h-20 lg:h-24 bg-gray-300 flex flex-wrap items-center justify-between px-5 lg:px-24">
            <p className="text-3xl font-medium text-slate-700">History</p>
            <div className="flex flex-row space-x-4 -tracking-tight">
              <a href="/" className="text-blue-700">
                Beranda
              </a>
              <span>/</span>
              <span>History</span>
            </div>
          </div>
          {historys.map((history) => (
            <div
              className="flex items-center justify-center px-7 lg:px-28 bg-white"
              key={history.uuid}
            >
              <main className="text-justify">
                <img
                  src={history.url}
                  alt="Gambar"
                  className="w-[35rem] h-96 object-cover rounded-md float-left mr-4"
                />
                {history.desc}
              </main>
            </div>
          ))}
          <footer className="mt-auto">
            <Footer />
          </footer>
        </div>
      </div>
    </>
  );
};

export default History;
