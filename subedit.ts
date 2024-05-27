//? ===============  Variable Declaration ===============
import { getFirstLineTime, getLastLineTime, formatTime, theHeader, encodeText, theOtherThings } from "./helpers.ts";
import { generateLines } from "./lines.ts";
//? =============== End of Variable Declaration ===============

/*
* 1. Get the first line time and last line time
* 2. Calculate the time for each new line
* 3. format the starting lines
* 4. format the ending lines
* 6. join lines together
* 7. Add the header then the lines
*/


// It reads the first line time
const firstLineTime = await getFirstLineTime("./subtitles/test.srt");
const lastLineTime = await getLastLineTime("./subtitles/test.srt");

if (firstLineTime === 0) {
  console.log("FILE NOT FOUND")
  Deno.exit()
}
// Generate the lines
const lines: string[] = generateLines("فڵان فیلم", "محمد دیبالا", "بەرهەم خالید")
// then it divides the lines based on the gap in beggingin of each line
const eachLineTime = Math.abs(firstLineTime / lines.length);

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
  const startTime = formatTime(lastLineTime + secondTimeCounter);
  const endTime = formatTime(lastLineTime + secondTimeCounter + 3);
  secondTimeCounter += 3;
  return `Dialogue: 0,${startTime},${endTime}, Default,,0,0,0,,${line}\n`;
}).join("");


// Write the formatted subtitle content to a file
await Deno.writeFile("./output/output.ass", encodeText(theHeader))
await Deno.writeFile("./output/output.ass", encodeText(starterLines), { append: true });
await Deno.writeFile("./output/output.ass", encodeText(endLines), { append: true });
await Deno.writeFile("./output/output.ass", encodeText(theOtherThings), { append: true });

console.log("Subtitle file created successfully.");
