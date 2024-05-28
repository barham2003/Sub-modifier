//? ===============  Variable Declaration ===============
import { MetaData } from "./Metadata.ts";
import { Subtitle } from "./Subtitle.ts";
import { encodeText } from "./helpers.ts";
import { movedLogos } from "./lines.ts";
//? =============== End of Variable Declaration ===============

/*
* 1. Make Subtitle object
* 2. generate meta data lines
* 3. join all lines together
* 4. Make write the output
*/


let text

/*
try {
  text = await Deno.readTextFile("./subtitles/test.srt");
} catch (error) {
  if (error.code === "ENOENT") console.log("File not found")
    else console.log("Something went wrong with reading the file")
  Deno.exit()
}
*/

try {
  const url = "https://utfs.io/f/9277dc6b-914d-46ba-a9bf-91c43aa6870f-2487m.srt";
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download file from ${url}`);
  text = await response.text();
} catch (_e) {
  console.log(_e)
  Deno.exit()
}

//* Create Subtitle Object
const sub = new Subtitle(text)

//* Then generate metadata according to the subtitle and names... 
const { endingLines, starterLines, header } = new MetaData(sub, "Anatomy of a Murder (1966)", "محمد دیبالا", "بەرهەم خالید")

//* Combine all generated things together
const all = header + starterLines + sub.assBody + endingLines + movedLogos

//* Write the formatted subtitle content to a file
await Deno.writeFile("./output/output.ass", encodeText(all))

console.log("Subtitle file created successfully.");
