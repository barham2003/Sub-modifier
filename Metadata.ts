import { Subtitle } from "./Subtitle.ts";
import { generateLines, generateHeader } from "./lines.ts";

export class MetaData {
    private readonly firstLineTime: number
    private readonly lastLineTime: number

    readonly starterLines: string
    readonly endingLines: string
    readonly header: string


    private readonly lines: string[]

    constructor(subtitle: Subtitle, movieName: string, translator: string, technique: string) {
        this.firstLineTime = subtitle.firstLineTime
        this.lastLineTime = subtitle.lastLineTime
        this.lines = generateLines(movieName, translator, technique)
        this.header = generateHeader(movieName)

        this.starterLines = this.generateStarterLines()
        this.endingLines = this.generateEndingLines()
    }


    generateStarterLines() {
        const eachLineTime = Math.abs(this.firstLineTime / this.lines.length);
        let timeCounter = 0;
        const theStarterLines = this.lines.map((line, _index) => {
            const startTime = formatTime(timeCounter);
            const endTime = formatTime(timeCounter + eachLineTime);
            timeCounter += eachLineTime;
            return `Dialogue: 0,${startTime},${endTime}, Default,,0,0,0,,${line}\n`;
        }).join("");
        return theStarterLines
    }


    generateEndingLines() {
        let secondTimeCounter = 0
        const endLines = this.lines.map((line, _index) => {
            const startTime = formatTime(this.lastLineTime + secondTimeCounter);
            const endTime = formatTime(this.lastLineTime + secondTimeCounter + 2);
            secondTimeCounter += 3;
            return `Dialogue: 0,${startTime},${endTime}, Default,,0,0,0,,${line}\n`;
        }).join("");


        return endLines
    }

}




function formatTime(timeInSeconds: number) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const centiseconds = Math.floor((timeInSeconds % 1) * 100); // Convert fractional part to centiseconds

    const formattedTime = `${String(hours)}:${String(
        minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(
        centiseconds
    ).padStart(2, "0")}`;

    return formattedTime;
}