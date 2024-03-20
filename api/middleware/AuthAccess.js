import User from "../models/UsersModels.js";

export const AuthAccess = async (req, res, next) => {
  if (!req.session.userId)
    return res.status(401).json({ msg: "Please log in to your account" });
  const user = await User.findOne({
    where: {
      uid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "Users Not Found..." });
  req.userId = user.id;
  next();
};
