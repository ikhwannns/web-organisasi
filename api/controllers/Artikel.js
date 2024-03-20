import Artikel from "../models/ArtikelModels.js";
import path from "path";
import fs from "fs";

export const getArtikel = async (req, res) => {
  try {
    const response = await Artikel.findAll();
    res.json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getArtikelById = async (req, res) => {
  try {
    const response = await Artikel.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createArtikel = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded...." });
  const judul = req.body.title;
  const penulis = req.body.writer;
  const desc = req.body.desc;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Image..." });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be last than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Artikel.create({
        judul: judul,
        penulis: penulis,
        desc: desc,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Artikel created succesfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateArtikel = async (req, res) => {
  const artikel = await Artikel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!artikel) return res.status(404).json({ msg: "No Data Found" });
  let fileName = artikel.image;
  if (req.files && req.files.file) {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images..." });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5MB" });

    const filepath = `./public/images/${artikel.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const judul = req.body.title;
  const penulis = req.body.writer;
  const desc = req.body.desc;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  try {
    await Artikel.update(
      { judul: judul, penulis: penulis, desc: desc, image: fileName, url: url },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Artikel Updated Successfyly" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteArtikel = async (req, res) => {
  const artikel = await Artikel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!artikel) return res.status(404).json({ msg: "No Data Found" });
  try {
    const filePath = `./public/images/${artikel.image}`;
    fs.unlinkSync(filePath);
    await Artikel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Artikel Deleted Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};
