import { createReadStream } from "node:fs";
import { resolve } from "node:path";
import { pipeline } from "node:stream/promises";
import { customOutput } from "./other.js";
import displayCurrentDirectory from "./displayCurrentDirectory.js";

export default async function handleCat([pathToFile]) {
  try {
    pathToFile = resolve(pathToFile);
    const readebleStream = createReadStream(pathToFile, { encoding: "utf8" });
    await pipeline(readebleStream, customOutput());

    displayCurrentDirectory();
  } catch (error) {
    console.log("Operations failed");
  }
}
