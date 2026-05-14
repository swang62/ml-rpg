import { resolve } from "node:path";

const isProd = process.env.NODE_ENV === "production";

export function dataDir(sub: string): string {
  return resolve(`.data/${sub}/${isProd ? "prod" : "dev"}`);
}
