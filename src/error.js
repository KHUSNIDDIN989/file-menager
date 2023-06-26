import displayCurrentDirectory from "./displayCurrentDirectory.js";

export default function handleError(error) {
  return error ? console.log("Operation failed") : displayCurrentDirectory();
}
