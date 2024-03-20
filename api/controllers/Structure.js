import Structure from "../models/StructureModels.js";
import path from "path";
import fs from "fs";

export const getMembers = async (req, res) => {
  try {
    const response = await Structure.findAll();
    res.json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getMembersById = async (req, res) => {
  try {
    const response = await Structure.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createMembers = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded...." });
  const jabatan = req.body.position;
  const nama = req.body.name;
  const divisi = req.body.division;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/imageMember/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Image..." });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be last than 5 MB" });

  file.mv(`./public/imageMember/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Structure.create({
        jabatan: jabatan,
        nama: nama,
        divisi: divisi,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "New Members Created Succesfuly..." });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const editMembers = async (req, res) => {
  const member = await Structure.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!member) return res.status(404).json({ msg: "No Data Found" });
  let fileName = member.image;
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

    const filepath = `./public/imageMember/${member.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/imageMember/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const jabatan = req.body.position;
  const nama = req.body.name;
  const divisi = req.body.division;
  const url = `${req.protocol}://${req.get("host")}/imageMember/${fileName}`;
  try {
    await Structure.update(
      {
        jabatan: jabatan,
        nama: nama,
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
    res.status(200).json({ msg: "The Members Updated Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteMembers = async (req, res) => {
  const member = await Structure.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!member) return res.status(404).json({ msg: "No Data Found" });
  try {
    const filePath = `./public/imageMember/${member.image}`;
    fs.unlinkSync(filePath);
    await Structure.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ msg: "Members Deleted Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};
