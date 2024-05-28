import { Subtitle } from "./Subtitle.ts";
import { generateLines, generateHeader } from "./lines.ts";

export class MetaData {
    readonly starterLines: string;
    readonly endingLines: string;
    readonly header: string;

    private readonly lines: string[];

    constructor(
        subtitle: Subtitle,
        movieName: string,
        translator: string,
        technique: string
    ) {
        this.lines = generateLines(movieName, translator, technique);
        this.header = generateHeader(movieName);

        this.starterLines = this.generateStarterLines(subtitle.firstLineTime);
        this.endingLines = this.generateEndingLines(subtitle.lastLineTime);
    }

    generateStarterLines(firstLineTime: number) {
        const eachLineTime = Math.abs(firstLineTime / this.lines.length);
        let timeCounter = 0;
        const theStarterLines = this.lines
            .map((line) => {
                const startTime = formatTime(timeCounter);
                const endTime = formatTime(timeCounter + eachLineTime);
                timeCounter += eachLineTime;
                return `Dialogue: 0,${startTime},${endTime}, Default,,0,0,0,,${line}\n`;
            })
            .join("");
        return theStarterLines;
    }

    generateEndingLines(lastLineTime: number) {
        let secondTimeCounter = 2;
        console.log("THE TIME: ", formatTime(lastLineTime))
        const endLines = this.lines
            .map((line) => {
                const startTime = formatTime(lastLineTime + secondTimeCounter);
                const endTime = formatTime(lastLineTime + secondTimeCounter + 5);
                secondTimeCounter += 5;
                return `Dialogue: 0,${startTime},${endTime}, Default,,0,0,0,,${line}\n`;
            })
            .join("");

        return endLines;
    }
}

function formatTime(timeInSeconds: number) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const centiseconds = Math.floor((timeInSeconds % 1) * 100); // Convert fractional part to centiseconds

    const formattedTime = `${String(hours)}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(centiseconds).padStart(2, "0")}`;

    return formattedTime;
}
