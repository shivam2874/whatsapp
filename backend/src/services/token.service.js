import { sign } from "../utils/token.utils.js";

export const generateToken = async (payload, expiresIn, secret) => {
  let token = await sign(payload, expiresIn, secret);
  return token;
};
