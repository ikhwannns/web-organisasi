import Dokumentasi from "../models/DokumentasiModels.js";
import path from "path";
import fs from "fs";

export const getGalery = async (req, res) => {
  try {
    const response = await Dokumentasi.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const getGaleryById = async (req, res) => {
  try {
    const response = await Dokumentasi.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const savePicture = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded...." });
  const title = req.body.title;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/imageDok/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Image..." });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be last than 5 MB" });

  file.mv(`./public/imageDok/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Dokumentasi.create({
        title: title,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Picture Successfully Saved" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updatePicture = async (req, res) => {
  const galery = await Dokumentasi.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!galery) return res.status(404).json({ msg: "No Data Found" });
  let fileName = galery.image;
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

    const filepath = `./public/imageDok/${galery.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/imageDok/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const title = req.body.title;
  const url = `${req.protocol}://${req.get("host")}/imageDok/${fileName}`;
  try {
    await Dokumentasi.update(
      { title: title, image: fileName, url: url },
      {
        where: {
          uuid: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Galery Updated Successfyly" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePicture = async (req, res) => {
  const galery = await Dokumentasi.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!galery) return res.status(404).json({ msg: "No Data Found" });
  try {
    const filePath = `./public/imageDok/${galery.image}`;
    fs.unlinkSync(filePath);
    await Dokumentasi.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ msg: "Picture Deleted Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};
