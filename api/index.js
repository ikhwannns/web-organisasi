import express from "express";
import cors from "cors";
import db from "./config/Database.js";
import dotenv from "dotenv";
import session from "express-session";
import SequelizeStore from "connect-session-sequelize";
import router from "./route/UserRoute.js";
import FileUpload from "express-fileupload";
import AuthRoute from "./route/AuthRoute.js";
import ArtikelRoute from "./route/ArtikelRoute.js";
import ProkerRoute from "./route/ProkerRoute.js";
import PictureRoute from "./route/DokumentasiRoute.js";
import StructureRoute from "./route/StructureRoute.js";
import HistoryRoute from "./route/HistoryRoute.js";
dotenv.config();

const app = express();
const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});
// (async () => {
//   await db.sync();
// })();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
      sameSite: "strict",
      httpOnly: "true",
    },
  })
);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(FileUpload());
app.use(router);
app.use(AuthRoute);
app.use(express.static("public"));
app.use(ArtikelRoute);
app.use(ProkerRoute);
app.use(PictureRoute);
app.use(StructureRoute);
app.use(HistoryRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log(`Server Running...`);
});
