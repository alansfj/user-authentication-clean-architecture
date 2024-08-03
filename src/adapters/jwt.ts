import jwt from "jsonwebtoken";
import { envs } from "./envs";

const JWT_SEED = envs.JWT_SEED;

export const JWT = {
  generateToken(payload: any, duration: string = "1h"): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (error, token) => {
        if (error) resolve(null);

        resolve(token!);
      });
    });
  },
};
