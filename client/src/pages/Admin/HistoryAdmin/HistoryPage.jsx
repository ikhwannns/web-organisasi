import { Link } from "react-router-dom";
import Layout from "../Layout";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import axios from "axios";
import { useEffect, useState } from "react";

const HistoryPage = () => {
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

  async function deleteHistory(historyId) {
    if (confirm("Are You Sure Wan't To Delete Your History?")) {
      try {
        await axios.delete(`http://localhost:9900/history/${historyId}`);
        window.location.reload(); // Refresh the page after history is deleted
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <Layout>
      {historys.length > 0 ? (
        historys.map((history) => {
          return (
            <>
              <div className="flex flex-col mb-4">
                <div className="max-w-5xl rounded-md mx-auto p-2 bg-slate-200">
                  <main className="text-justify">
                    <img
                      src={history.url}
                      alt="Gambar"
                      className="w-[35rem] h-96 object-cover rounded-md float-left mr-4"
                    />
                    {history.desc}
                  </main>
                </div>
              </div>
              <div className="flex justify-center items-center text-center gap-2">
                <Link
                  to={`/editHistory/${history.uuid}`}
                  className="w-auto bg-yellow-400 hover:bg-yellow-600 rounded-xl p-2"
                >
                  Update
                </Link>
                <button
                  className="bg-red-400 w-auto hover:bg-red-600 rounded-xl p-2"
                  onClick={() => deleteHistory(history.uuid)}
                >
                  Delete
                </button>
              </div>
            </>
          );
        })
      ) : (
        <Link
          to={"/addHistory"}
          className="mb-4 bg-blue-400 hover:bg-blue-600 w-52 p-2 rounded-xl text-center flex items-center justify-center gap-2 "
        >
          <AddCircleOutlineRoundedIcon /> Add New History
        </Link>
      )}
    </Layout>
  );
};

export default HistoryPage;
