export class Subtitle {
    readonly text: string;
    readonly firstLineTime: number;
    readonly lastLineTime: number;
    readonly assBody: string;
    constructor(text: string) {
        this.text = text;
        this.firstLineTime = this.getFirstLineTime();
        this.lastLineTime = this.getLastLineTime();
        this.assBody = this.getAss();
    }

    private getFirstLineTime() {
        try {
            const theArray = this.text
                .split("\n")
                .filter((line) => line.match(/^[0-9]{2}:/));
            const subArray = theArray.map((line) => line.trim());
            const firstSub = subArray[0].split("-->")[0].trim();
            const timeString = firstSub.split(",")[0];
            const [hours, minutes, seconds] = timeString.split(":").map(Number);
            const totalSeconds = hours * 3600 + minutes * 60 + seconds;
            return totalSeconds;
        } catch (_error: unknown) {
            return 0;
        }
    }

    private getLastLineTime() {
        try {
            const theArray = this.text
                .split("\n")
                .filter((line) => line.match(/^[0-9]{2}:/));
            const subArray = theArray.map((line) => line.trim());
            const lastSub = subArray.at(-1)?.split("-->")[1].trim();
            console.log(lastSub)
            const timeString = lastSub?.split(",")[0];
            if (!timeString) return 0;
            const [hours, minutes, seconds] = timeString.split(":").map(Number);
            const totalSeconds = hours * 3600 + minutes * 60 + seconds;
            return totalSeconds;
        } catch (_error: unknown) {
            return 0;
        }
    }

    // Format SRT
    private getAss() {
        const srtContent = this.text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

        // Define the regex pattern for matching SRT blocks
        const srtRegex =
            /(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})\n([\s\S]*?)(?=\n{2}|\n*$)/g;

        // Get all matches
        const matches = Array.from(srtContent.matchAll(srtRegex));

        // Convert matches to subtitle objects
        const subtitles = matches.map((match) => ({
            index: match[1],
            startTime: formatTimeToAss(match[2].replace(",", ".")),
            endTime: formatTimeToAss(match[3].replace(",", ".")),
            text: match[4].replace(/\n/g, "\\N").trim(),
        }));
        const assBody = subtitles
            .map((sub) => {
                return `Dialogue: 0,${sub.startTime},${sub.endTime},Default,,0,0,0,,${sub.text}`;
            })
            .join("\n");

        return assBody + "\n";
    }
}

function formatTimeToAss(time: string) {
    let [hours, minutes, seconds] = time.split(":");
    hours = parseInt(hours, 10).toString();
    minutes = minutes.padStart(2, "0");
    let [sec, millis] = seconds.split(".");
    sec = sec.padStart(2, "0");
    millis = millis.padStart(3, "0").slice(0, 2);
    return `${hours}:${minutes}:${sec}.${millis}`;
}
