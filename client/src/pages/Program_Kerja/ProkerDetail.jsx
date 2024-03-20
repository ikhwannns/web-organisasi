import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import FooterArtikel from "../../component/Footer/FooterArtikel";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const DetailProker = () => {
  const [title, setTitle] = useState("");
  const [period, setPeriod] = useState("");
  const [desc, setDesc] = useState("");
  const [waktu, setWaktu] = useState("");
  const [division, setDivision] = useState("");
  const [image, setImage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getProkerById();
  }, []);

  const getProkerById = async () => {
    const response = await axios.get(`http://localhost:9900/proker/${id}`);
    setTitle(response.data.title);
    setPeriod(response.data.periode);
    setDesc(response.data.desc);
    setWaktu(response.data.time);
    setDivision(response.data.divisi);
    setImage(response.data.url);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col h-screen">
        <div
          className="flex flex-wrap justify-center items-center p-6 w-full font-poppins font-extrabold text-md "
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
            href="/proker"
            className="font-bold font-poppins text-slate-900 transform hover:scale-110 transition duration-300 ease-in-out"
          >
            <KeyboardReturnIcon />
            Back
          </a>
          <main className="max-w-5xl flex flex-col mt-4">
            <div className="flex flex-wrap space-x-2 font-poppins font-semibold text-gray-400">
              <span>{waktu}</span>
              <span>|</span>
              <span>{division}</span>
              <span>|</span>
              <span>Periode {period}</span>
            </div>
            <p className="flex-wrap mt-3 text-justify font-extralight">
              {desc} Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Sequi, vero aliquam, ut aspernatur eaque ullam corrupti ducimus
              expedita ad eum rem voluptas ex mollitia placeat quis quia esse
              nostrum modi? Praesentium fugiat ipsa earum vel, animi incidunt
              voluptates eveniet in asperiores quos accusantium nemo cumque odio
              voluptate, sint culpa eaque iusto commodi, alias dignissimos aut
              itaque sequi a! Excepturi, exercitationem! Iste at nisi id tenetur
              eos doloribus, maiores tempore earum perspiciatis nemo eum! Nobis
              sequi, fuga nisi quod delectus nam officiis eveniet amet, nemo ad
              debitis sit eum? Voluptate, consectetur. Accusantium explicabo
              deserunt esse. Voluptate laboriosam officiis eius sunt saepe
              facilis, excepturi voluptas! In, necessitatibus nihil molestias
              autem veniam corrupti alias exercitationem harum quae provident
              iste nemo, saepe iusto? Qui? Fugit fuga, numquam quo enim aperiam,
              ducimus illo assumenda, eligendi eos possimus recusandae et
              facilis temporibus aliquid ut incidunt reprehenderit atque? Et
              corrupti libero fugit molestias eos quasi. Fuga, optio?
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

export default DetailProker;
