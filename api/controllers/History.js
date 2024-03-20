import Sejarah from "../models/HistoryModels.js";
import path from "path";
import fs from "fs";

export const getSejarah = async (req, res) => {
  try {
    const response = await Sejarah.findAll();
    res.json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getSejarahById = async (req, res) => {
  try {
    const response = await Sejarah.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createSejarah = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded...." });
  const desc = req.body.desc;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/historyImg/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Image..." });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be last than 5 MB" });

  file.mv(`./public/historyImg/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Sejarah.create({
        desc: desc,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Sejarah created succesfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateSejarah = async (req, res) => {
  const sejarah = await Sejarah.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!sejarah) return res.status(404).json({ msg: "No Data Found" });
  let fileName = sejarah.image;
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

    const filepath = `./public/historyImg/${sejarah.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/historyImg/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const desc = req.body.desc;
  const url = `${req.protocol}://${req.get("host")}/historyImg/${fileName}`;
  try {
    await Sejarah.update(
      { desc: desc, image: fileName, url: url },
      {
        where: {
          uuid: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Sejarah Updated Successfyly" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteSejarah = async (req, res) => {
  const sejarah = await Sejarah.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!sejarah) return res.status(404).json({ msg: "No Data Found" });
  try {
    const filePath = `./public/historyImg/${sejarah.image}`;
    fs.unlinkSync(filePath);
    await Sejarah.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ msg: "Sejarah Deleted Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};
