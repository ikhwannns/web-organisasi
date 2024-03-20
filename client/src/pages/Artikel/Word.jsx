import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import FooterArtikel from "../../component/Footer/FooterArtikel";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
// import DateFormatter from "../../lib/utils";

const Word = () => {
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [desc, setDesc] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [image, setImage] = useState("");
  const { id } = useParams();

  const formatter = new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  useEffect(() => {
    getArtikelById();
  }, []);

  const getArtikelById = async () => {
    const response = await axios.get(`http://localhost:9900/artikel/${id}`);
    setTitle(response.data.judul);
    setWriter(response.data.penulis);
    setDesc(response.data.desc);
    setImage(response.data.url);
    setCreatedAt(formatter.format(new Date(response.data.createdAt)));
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col h-screen">
        <div
          className="flex flex-wrap justify-center items-center p-6 w-full font-poppins font-extrabold text-md"
          style={{
            boxShadow: "0 0 10px 5px black",
            top: 0,
            right: 0,
            left: 0,
            backgroundImage: `url(${image})`,
            objectFit: "cover",
          }}
        >
          <div className="backdrop-blur-sm bg-gray-300/90 p-2 rounded-xl font-extrabold text-center">
            <p className="relative">{title}</p>
          </div>
        </div>
        {/* Main */}
        <div className="flex flex-col items-center p-3 lg:p-0 mt-5">
          <a
            href="/artikel"
            className="font-bold font-poppins text-slate-900 transform hover:scale-110 transition duration-300 ease-in-out"
          >
            <KeyboardReturnIcon />
            Back
          </a>
          <main className="max-w-5xl flex flex-col mt-4">
            <div className="flex flex-wrap space-x-2 font-poppins font-semibold text-gray-400">
              <span>Review</span>
              <span>|</span>
              <span>{createdAt}</span>
              <span>|</span>
              <span>{writer}</span>
            </div>
            <p className="flex-wrap mt-3 text-justify font-extralight">
              {desc}
            </p>
          </main>
        </div>
      </div>
      <div className="">
        <FooterArtikel />
      </div>
    </div>
  );
};

export default Word;
