// It modifies the times
export function formatTime(timeInSeconds: number) {
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

export const encodeText = (text: string) => new TextEncoder().encode(text);






