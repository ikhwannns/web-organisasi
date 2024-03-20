import HomeIcon from "@mui/icons-material/Home";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import Map from "./Map";
import "tailwindcss-gradient";
import AppBar from "../../component/AppBar/AppBar";
import Footer from "../../component/Footer/Footer";
import axios from "axios";
import Logo from "../../assets/logo.jpg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [prokers, setProkers] = useState([]);
  const [galerys, setGalerys] = useState([]);

  useEffect(() => {
    getProker();
  }, []);

  useEffect(() => {
    getGalerys();
  }, []);

  const getProker = async () => {
    const response = await axios.get("http://localhost:9900/proker");
    setProkers(response.data);
  };

  const getGalerys = async () => {
    const response = await axios.get("http://localhost:9900/galery");
    setGalerys(response.data);
  };

  return (
    <>
      <div>
        <AppBar />
      </div>
      <div className="font-poppins relative bg-slate-200">
        <div
          className="flex flex-wrap justify-center items-center bg-gradient-to-b from-blue-600 to-slate-200 h-lvh"
          style={{
            marginTop: "4.5rem",
          }}
        >
          <div className="flex flex-col w-full md:w-96 text-white p-6">
            <p className="text-3xl font-extrabold mb-4">
              IKATAN MAHASISWA MANAJEMEN
            </p>
            <p className="text-justify">
              Ikatan Mahasiswa Fakultas Ekonomi dan Bisnis Universitas
              Hasanuddin (IMMAJ FEB-UH) merupakan lembaga mahasiswa tingkat
              jurusan yang berada dalam naungan Fakultas Ekonomi dan Bisnis
              Universitas Hasanuddin dengan minat dan keahlian dalam bidang
              manajemen. IMMAJ FEB-UH Mengembangkan dan menerapkan
              prinsip-prinsip manajemen dalam berbagai konteks organisasi dengan
              berlandaskan nilai Keluarga Mahasiswa Fakultas Ekonomi dan Bisnis
              Universitas Hasanuddin (KEMA FEB-UH) .
            </p>
          </div>
          <img
            src={Logo}
            alt="Logo"
            className="rounded-full md:min-w-96 md:h-96 mix-blend-color-burn hover:mix-blend-normal
            hover:scale-110 transition duration-300 ease-in-out"
          />
        </div>
        {/* Artikel Terbaru */}
        <div className="flex justify-center items-center mt-20">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 p-6">
            {prokers
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 3)
              .map((proker) => (
                <Link
                  to={`/detailProker/${proker.uuid}`}
                  className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-2xl flex flex-col items-center space-x-4 gap-y-10 opacity-100 active:opacity-50 group hover:bg-slate-200 hover:shadow-2xl hover:shadow-black transition-all"
                  key={proker.uuid}
                >
                  <div className="flex-shrink-0">
                    <img
                      className="h-80 w-80 object-cover rounded-full"
                      src={proker.url}
                      alt="Logo"
                    />
                  </div>
                  <div>
                    <div className="text-xl font-medium text-black">
                      {proker.title}
                    </div>
                    <p className="text-gray-500">
                      {proker.desc.slice(0, 20)}
                      <span className="tracking-widest">...</span>
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        {/* Dokumentasi */}
        <div className="mt-20">
          <p className="flex justify-center items-center space-y-3 font-black text-5xl text-gray-400 mb-10">
            DOKUMENTASI
          </p>
          {galerys.map((galery) => (
            <div
              className="flex flex-wrap justify-center items-center lg:space-x-3"
              key={galery.uuid}
            >
              <div className="flex-col md:mt-2 mt-0 py-5 lg:py-0">
                <img
                  src={galery.url}
                  alt="Images Dokumentasi"
                  className="h-auto w-96 rounded-xl"
                />
              </div>
            </div>
          ))}
        </div>
        {/* Kontak */}
        <div className="mt-20">
          <p className="font-black text-5xl text-gray-400 flex justify-center items-center mb-10">
            Contact Us
          </p>
          <div className="flex flex-wrap justify-center items-center">
            <Map />
            <div className="flex flex-col mt-5 mb-2">
              <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-2xl flex flex-col items-center">
                <div className="flex-shrink-0">
                  <HomeIcon sx={{ fontSize: "2.5rem" }} />
                </div>
                <div>
                  <a
                    href="https://maps.app.goo.gl/YH4JF3naspEreadd6"
                    className="text-gray-500 text-center"
                  >
                    Student Center Lt.2 FEB Unhas
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center mt-5">
            <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-2xl flex flex-col items-center mt-2">
              <div className="flex-shrink-0">
                <AlternateEmailIcon sx={{ fontSize: "2.5rem" }} />
              </div>
              <div>
                <p className="text-gray-500">immajfebuh@gmail.com</p>
              </div>
            </div>
            <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-2xl flex flex-col items-center mt-2">
              <div className="flex-shrink-0">
                <InstagramIcon sx={{ fontSize: "2.5rem" }} />
              </div>
              <div>
                <a
                  href="https://www.instagram.com/immajfebuh?igsh=MXZkbGl0YjM5N3B6dA=="
                  className="text-gray-500"
                >
                  Instagram IMMAJ
                </a>
              </div>
            </div>
            <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-2xl flex flex-col items-center mt-2">
              <div className="flex-shrink-0">
                <XIcon sx={{ fontSize: "2.5rem" }} />
              </div>
              <div>
                <a
                  href="https://x.com/immajfebuh?s=21&t=vJZrP8r3yNxsvRgA6kPTyg"
                  className="text-gray-500"
                >
                  Twitter IMMAJ
                </a>
              </div>
            </div>
            <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-2xl flex flex-col items-center mt-2">
              <div className="flex-shrink-0">
                <ContactPhoneIcon sx={{ fontSize: "2.5rem" }} />
              </div>
              <div>
                <a href="+6286943437179" className="text-gray-500">
                  +62 869-4343-7179
                </a>
              </div>
            </div>
            <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-2xl flex flex-col items-center mt-2">
              <div className="flex-shrink-0">
                <FacebookIcon sx={{ fontSize: "2.5rem" }} />
              </div>
              <div>
                <a
                  href="https://www.facebook.com/immaj.feuh"
                  className="text-gray-500"
                >
                  Facebook IMMAJ
                </a>
              </div>
            </div>
            <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-2xl flex flex-col items-center mt-2">
              <div className="flex-shrink-0">
                <AudiotrackIcon sx={{ fontSize: "2.5rem" }} />
              </div>
              <div>
                <a
                  href="https://www.tiktok.com/@immajfebuh?_t=8kdYR1UbZwI&_r=1"
                  className="text-gray-500"
                >
                  TikTok IMMAJ
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
