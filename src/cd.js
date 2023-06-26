import {chdir} from "node:process"

import displayCurrentDirectory from "./displayCurrentDirectory.js";

export default async function handleCd([pathToFile]) {
    try {
        chdir(pathToFile);
        displayCurrentDirectory();
    } catch (error) {
        console.log("Operations failed");
    }
}

