import { createReadStream, createWriteStream } from "node:fs";
import { parse, resolve } from "node:path";
import { pipeline } from "node:stream/promises";
import { createBrotliDecompress } from "node:zlib";

import displayCurrentDirectory from "./displayCurrentDirectory.js";
import isDirectory from "./isDirectory.js";
import isFile from "./isFile.js";

export default async function handleDecompress([
  pathToFile,
  pathToDestination,
]) {
  try {
    const isNotDirectory = !(await isDirectory(pathToDestination));
    const isNotFile = !(await isFile(pathToFile));

    if (isNotDirectory) throw new Error("it's not a directory");
    if (isNotFile) throw new Error("it's not a file");

    pathToFile = resolve(pathToFile);
    const { name, ext } = parse(pathToFile);

    if(!ext.includes(".br")) throw new Error("Invalid file extension");

    pathToDestination = resolve(pathToDestination, name);

    const readebleStream = createReadStream(pathToFile, { encoding: "utf8" });
    const writebleStream = createWriteStream(pathToDestination);
    const brotliStream = createBrotliDecompress();
    await pipeline(readebleStream, brotliStream, writebleStream);
    displayCurrentDirectory();
  } catch (error) {
    console.log("Operations failed");
  }
}
