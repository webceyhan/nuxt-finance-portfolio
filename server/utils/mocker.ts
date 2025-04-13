import { readFileSync } from "fs";
import { MOCKS_DIR } from "../constants";

export function fetchMock<T>(path: string): T {
  const filename = `${MOCKS_DIR}${path}.json`;
  const data = readFileSync(filename, "utf-8");

  return JSON.parse(data);
}
