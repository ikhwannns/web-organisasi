import Proker from "../models/ProgramModels.js";
import path from "path";
import fs from "fs";

export const getProker = async (req, res) => {
  try {
    const response = await Proker.findAll();
    res.json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getProkerById = async (req, res) => {
  try {
    const response = await Proker.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createProker = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded...." });
  const title = req.body.title;
  const periode = req.body.period;
  const desc = req.body.desc;
  const time = req.body.waktu;
  const divisi = req.body.division;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/imagesProg/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Image..." });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be last than 5 MB" });

  file.mv(`./public/imagesProg/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Proker.create({
        title: title,
        periode: periode,
        desc: desc,
        time: time,
        divisi: divisi,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Work Program created succesfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateProker = async (req, res) => {
  const proker = await Proker.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!proker) return res.status(404).json({ msg: "No Data Found" });
  let fileName = proker.image;
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

    const filepath = `./public/imagesProg/${proker.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/imagesProg/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const title = req.body.title;
  const periode = req.body.period;
  const desc = req.body.desc;
  const time = req.body.waktu;
  const divisi = req.body.division;
  const url = `${req.protocol}://${req.get("host")}/imagesProg/${fileName}`;
  try {
    await Proker.update(
      {
        title: title,
        periode: periode,
        desc: desc,
        time: time,
        divisi: divisi,
        image: fileName,
        url: url,
      },
      {
        where: {
          uuid: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Work Program Updated Successfyly" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProker = async (req, res) => {
  const proker = await Proker.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!proker) return res.status(404).json({ msg: "No Data Found" });
  try {
    const filePath = `./public/imagesProg/${proker.image}`;
    fs.unlinkSync(filePath);
    await Proker.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ msg: "Work Proker Deleted Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};
