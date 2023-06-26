import EventEmitter from "node:events";
import { homedir } from "node:os";
import { argv, chdir, exit, stdin, stdout } from "node:process";
import readLine from "node:readline";

import handleAdd from "./add.js";
import handleCat from "./cat.js";
import handleCd from "./cd.js";
import handleCompress from "./compress.js";
import handleCp from "./cp.js";
import handleDecompress from "./decompress.js";
import handleHash from "./hash.js";
import handleLine from "./line.js";
import handleLs from "";
import handleMv from "";
import handleOs from "";
import handleRm from "";
import handleRn from "";
import handleUp from "";
import diplayCuurnetDirectory from "";

chdir(homedir());

const args = Object.fromEntries(
  argv.slice(2).map((arg) => {
    const [key, value] = arg.split("=");
    return [key, value];
  })
);

const username = args[`--username`] ? args[`--username`] : "stranger";

console.log(`Welcome to the File Manager! ${username}!`);
diplayCuurnetDirectory();

const eventEmitter = new EventEmitter();
eventEmitter.setMaxListeners(0);

eventEmitter
  .on("up", handleUp)
  .on("cd", handleCd)
  .on("ls", handleLs)
  .on("cat", handleCat)
  .on("add", handleAdd)
  .on("rn", handleRn)
  .on("cp", handleCp)
  .on("mv", handleMv)
  .on("rm", handleRm)
  .on("hash", handleHash)
  .on("os", handleOs)
  .on("compress", handleCompress)
  .on("decompress", handleDecompress);

const rl = readLine.createInterface(stdin, stdout);

rl.on(
  "line",
  handleLine.bind(rl, eventEmitter).on("SIGIN", () => rl.close())
).on("close", () => {
  console.log(`Thank you for useng File Manager, ${username}!`);
  process.nextTick(() => exit());
});
