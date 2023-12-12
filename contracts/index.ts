import { Chain } from "../src/types";

export type CONTRACT_EXPORT = {
  [K in Chain]?: Record<string, string>;
};
