import jwt from "jsonwebtoken";
import { envs } from "./envs";
import { resolve } from "path";

const JWT_SEED = envs.JWT_SEED;

export const JWT = {
  async generateToken(
    payload: any,
    duration: string = "1h"
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (error, token) => {
        if (error) resolve(null);

        resolve(token!);
      });
    });
  },
  async validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SEED, (error, decoded) => {
        if (error) return resolve(null);

        resolve(decoded as T);
      });
    });
  },
};
