//? ===============  Variable Declaration ===============
import { Subtitle } from "./Subtitle.ts";
import { formatTime, encodeText, } from "./helpers.ts";
import { generateMetaLines, movedLogos, theHeader } from "./lines.ts";
//? =============== End of Variable Declaration ===============

/*
* 1. Make Subtitle object
* 2. generate meta data lines, then assign it to lines
* 3. Calculate the time for each new line
* 4. format the starting lines
* 5. format the ending lines
* 6. join all lines together
*/


let text
try {
  text = await Deno.readTextFile("./subtitles/test.srt");
} catch (error) {
  if (error.code === "ENOENT") console.log("File not found")
  else console.log("Something went wrong with reading the file")
  Deno.exit()
}

const sub = new Subtitle(text)

// Generate the lines
const lines: string[] = generateMetaLines("فڵان فیلم", "محمد دیبالا", "بەرهەم خالید")

// then it divides the lines based on the gap in beggingin of each line
const eachLineTime = Math.abs(sub.firstLineTime / lines.length);

// Make the starting lines
let timeCounter = 0;
const starterLines = lines.map((line, _index) => {
  const startTime = formatTime(timeCounter);
  const endTime = formatTime(timeCounter + eachLineTime);
  timeCounter += eachLineTime;
  return `Dialogue: 0,${startTime},${endTime}, Default,,0,0,0,,${line}\n`;
}).join("");

// Make the ending lines
let secondTimeCounter = 0
const endLines = lines.map((line, _index) => {
  const startTime = formatTime(sub.lastLineTime + secondTimeCounter);
  const endTime = formatTime(sub.lastLineTime + secondTimeCounter + 2);
  secondTimeCounter += 3;
  return `Dialogue: 0,${startTime},${endTime}, Default,,0,0,0,,${line}\n`;
}).join("");

const all = theHeader + starterLines + sub.assBody + endLines + movedLogos
// Write the formatted subtitle content to a file
await Deno.writeFile("./output/output.ass", encodeText(all))

console.log("Subtitle file created successfully.");
