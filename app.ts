//? ===============  Variable Declaration ===============
import { MetaData } from "./Metadata.ts";
import { Subtitle } from "./Subtitle.ts";
import { encodeText } from "./lib/utils.ts";
//? =============== End of Variable Declaration ===============

/*
* 1. Make Subtitle object
* 2. generate meta data lines
* 3. join all lines together
* 4. Make write the output
*/


let text

try {
  text = await Deno.readTextFile("./subtitles/onimusha.srt");
} catch (error) {
  if (error.code === "ENOENT") console.log("File not found")
  else console.log("Something went wrong with reading the file")
  Deno.exit()
}


//* Create Subtitle Object
const sub = new Subtitle(text)

//* Then generate metadata according to the subtitle and names... 
const { endingLines, starterLines, header, movedLogos } = new MetaData(sub, "Onimuasha", "محمد دیبالا", "بەرهەم خالید", "series", "ئەڵقەی یەکەم - وەرزی یەکەم")

//* Combine all generated things together
const all = header + starterLines + sub.assBody + endingLines + movedLogos

//* Write the formatted subtitle content to a file
await Deno.writeFile("./output/output.ass", encodeText(all))

console.log("Subtitle file created successfully.");
