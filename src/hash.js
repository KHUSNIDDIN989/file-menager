import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { resolve } from "node:path";
import { pipeline } from "node:stream/promises";
import { createBrotliDecompress } from "node:zlib";

import displayCurrentDirectory from "./displayCurrentDirectory.js";
import { customOutput } from "./other.js";

export default async function handleHash([pathToFile]) {
  try {
    pathToFile = resolve(pathToFile);
    const hash = createHash("sha256");
    const readebleStream = createReadStream(pathToFile);

    await pipeline(readebleStream, hash.setEncoding("hex"), customOutput);
    displayCurrentDirectory();
  } catch (e) {
    console.log("Operation failed");
  }
}
