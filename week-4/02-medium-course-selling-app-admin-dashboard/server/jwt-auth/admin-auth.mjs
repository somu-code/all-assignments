import jwt from "jsonwebtoken";

export const generateAdminJWT = (email) => {
  const payload = { email, role: "admin" };
  return jwt.sign(payload, process.env.ADMIN_TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
};