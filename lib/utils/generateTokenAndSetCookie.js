import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });

  res.cookie("token", token, {
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
    httpOnly: true,
  });
};
