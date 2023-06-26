import { createReadStream, createWriteStream } from "node:fs";
import { parse, resolve } from "node:path";
import { pipeline } from "node:stream/promises";
import displayCurrentDirectory from "./displayCurrentDirectory.js";

export default async function handleCp([pathToFile, pathToNewDirectory]) {
  try {
    pathToFile = resolve(pathToFile);
    const { base } = parse(pathToFile);
    pathToNewDirectory = resolve(pathToNewDirectory, base);

    const readebleStream = createReadStream(pathToFile, { encoding: "utf8" });
    const writeStream = createWriteStream(pathToNewDirectory, {
      encoding: "utf8",
    });
    await pipeline(readebleStream, writeStream);
    displayCurrentDirectory();
  } catch (error) {
    console.log("Operation failed");
  }
}
