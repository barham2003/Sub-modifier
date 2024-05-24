// ===============  Variable Declaration ===============
async function getFirstLineTime(file: string | URL) {
  const text = await Deno.readTextFile(file);
  const theArray = text.split("\n").filter((line) => line.match(/^[0-9]{2}:/));
  const subArray = theArray.map((line) => line.trim());
  const firstSub = subArray[0].split("-->")[0].trim();
  const timeString = firstSub.split(",")[0];
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  return totalSeconds;
}

//  Lines
const lines = [
  "hello",
  "how are you",
  "good bye",
  "nice to meet you",
  "great man",
  "nice try",
  "good job",
  "there will be killing",
  "one other",
  "the end",
];

// It modifies the times
function formatTime(timeInSeconds: number) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const milliseconds = Math.floor((timeInSeconds % 1) * 1000);

  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")},${String(
    milliseconds
  ).padStart(3, "0")}`;

  return formattedTime;
}

// =============== End of Variable Declaration ===============

// It reads the first line time
const firstLineTime = await getFirstLineTime("./subfile.srt");

// then it divides the lines based on the gap in beggingin of each line
const eachLineTime = Math.abs(firstLineTime / lines.length);

// Loop into it
let timeCounter = 0;
const modifiedLines = lines.map((line, index) => {
  const startTime = formatTime(timeCounter);
  const endTime = formatTime(timeCounter + eachLineTime);
  timeCounter += eachLineTime;
  return `${index + 1}\n00:${startTime} --> 00:${endTime}\n${line}\n\n`;
});

// Join the formatted lines into a single string
const subtitleContent = modifiedLines.join("");

const subtitleFormat = new TextEncoder().encode(subtitleContent);
await Deno.writeFile("./output.srt", subtitleFormat);
// Write the formatted subtitle content to a file

console.log("Subtitle file created successfully.");
