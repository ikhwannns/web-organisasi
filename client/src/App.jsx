import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Proker from "./pages/Program_Kerja/Proker";
import Artikel from "./pages/Artikel/Artikel";
import Word from "./pages/Artikel/Word";
import History from "./pages/About/History";
import Structure from "./pages/About/Structure";
import Mars from "./pages/About/Mars";
import Logos from "./pages/About/Logos";
import Write from "./pages/Admin/Write/Write";
import AddArtikel from "./component/AdminComp/main/Artikels/AddArtikel";
import UpdateArtikel from "./component/AdminComp/main/Artikels/UpdateArtikel";
import WorkProg from "./pages/Admin/Work_Program/WorkProg";
import AddProker from "./component/AdminComp/main/Prokers/AddProker";
import UpdateProker from "./component/AdminComp/main/Prokers/UpdateProker";
import DetailProker from "./pages/Program_Kerja/ProkerDetail";
import GaleryDok from "./pages/Admin/Galery/galeryDok";
import AddPicture from "./component/AdminComp/main/Documentation/AddPicture";
import StructureAdmin from "./pages/Admin/Structure/StructureAdmin";
import AddMember from "./component/AdminComp/main/Structure/AddMember";
import UpdateMember from "./component/AdminComp/main/Structure/SturctureUpdt";
import Login from "./component/Login/Login";
import HistoryPage from "./pages/Admin/HistoryAdmin/HistoryPage";
import AddHistory from "./component/AdminComp/main/History/AddHistory";
import EditHistory from "./component/AdminComp/main/History/EditHistory";

function App() {
  return (
    <div className="font-poppins">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="proker" element={<Proker />} />
          <Route path="detailProker/:id" element={<DetailProker />} />
          <Route path="artikel" element={<Artikel />} />
          <Route path="word/:id" element={<Word />} />
          <Route path="sejarah" element={<History />} />
          <Route path="struktur" element={<Structure />} />
          <Route path="mars" element={<Mars />} />
          <Route path="logo" element={<Logos />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="documentation" element={<GaleryDok />} />
          <Route path="structure" element={<StructureAdmin />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="workPorg" element={<WorkProg />} />
          <Route path="writeArtikel" element={<Write />} />
          <Route path="addArtikel" element={<AddArtikel />} />
          <Route path="edit/:id" element={<UpdateArtikel />} />
          <Route path="addProkers" element={<AddProker />} />
          <Route path="editProkers/:id" element={<UpdateProker />} />
          <Route path="addPicture" element={<AddPicture />} />
          <Route path="addMembers" element={<AddMember />} />
          <Route path="membersUpdt/:id" element={<UpdateMember />} />
          <Route path="editHistory/:id" element={<EditHistory />} />
          <Route path="addHistory" element={<AddHistory />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
