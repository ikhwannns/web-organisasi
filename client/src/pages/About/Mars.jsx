import { MusicalNoteIcon } from "@heroicons/react/24/outline";
import AppBar from "../../component/AppBar/AppBar";
import Footer from "../../component/Footer/Footer";
import Music from "./audio/music2.mp3";
import Logo from "../../assets/logo.jpg";

const Mars = () => {
  return (
    <>
      <AppBar />
      <div className=" h-lvh mt-16 lg:mt-20 font-poppins">
        <div className="top-0 left-0 right-0 h-20 lg:h-24 bg-gray-300 flex items-center justify-between px-5 lg:px-24">
          <p className="text-3xl font-medium text-slate-700">Mars</p>
          <div className="flex flex-row space-x-4 -tracking-tight">
            <a href="/" className="text-blue-700">
              Beranda
            </a>
            <span>/</span>
            <span>Mars</span>
          </div>
        </div>
        <div className="flex flex-col mt-20 space-y-20">
          <div className="lg:space-x-20 flex flex-wrap justify-center space-y-2 lg:space-y-0">
            <div className="flex flex-col space-y-3 w-3/4 lg:w-2/5">
              <div className="flex flex-wrap">
                <MusicalNoteIcon className="h-20 w-20" />
                <div className="flex flex-col">
                  <p className="text-2xl font-semibold">Mars IMMAJ</p>
                  <p className="">Ciptaan Kanda Rivo {"'"}95</p>
                </div>
              </div>
              <audio controls autoPlay>
                <source src={Music} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <div className="text-base lg:pl-20 italic space-y-5 text-gray-500">
                <p className="">
                  IKATAN MAHASISWA MANAJEMEN
                  <br />
                  BERJALAN BERSAMA
                  <br />
                  MENJUNJUNG KEBENARAN
                  <br />
                  ROBOHKAN KEANGKUHAN
                </p>
                <p>
                  LEPASKAN SEGALA BELENGGU
                  <br />
                  MENYONGSONG PENCERAHAN ZAMAN
                  <br />
                  IKATAN MAHASISWA MANAJEMEN
                </p>
                <p>
                  BERKARYA BERSAMA
                  <br />
                  MENGHADIRKAN CINTA
                  <br />
                  WUJUDKAN PERDAMAIAN
                  <br />
                  LEPASKAN SEGALA BELENGGU
                  <br />
                  MENYONGSONG PENCERAHAN ZAMAN
                  <br />
                  IKATAN MAHASISWA MANAJEMEN
                  <br />
                  TUMBUH BERSAMA...
                </p>
              </div>
            </div>
            <img src={Logo} alt="imgMusic" className="w-96 h-96 rounded-3xl" />
          </div>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Mars;
