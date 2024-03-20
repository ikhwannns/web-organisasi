import User from "../models/UsersModels.js";
import argon2 from "argon2";

export const getAllUser = async (req, res) => {
  try {
    const user = await User.findAll({
      attributes: ["uid", "name", "email", "createdAt"],
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        uid: req.params.id,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password And Confrim Password Not Valid..." });
  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.status(201).json("Register Compleated...");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User Not Found..." });
  const { name, email, password, confPassword } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword)
    return res
      .status(401)
      .json({ msg: "Password And Confrim Password Not Valid..." });
  try {
    await User.update(
      {
        name: name,
        email: email,
        password: hashPassword,
      },
      {
        where: {
          uid: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Updated Success..." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uid: req.params.id,
    },
  });
  if (!user) return req.status(404).json({ message: "Users Not Found..." });
  try {
    await User.destroy({
      where: {
        uid: req.params.id,
      },
    });
    res.status(200).json({ msg: "Deleted Compleated..." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
