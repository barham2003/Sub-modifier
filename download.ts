
async function downloadFile(url: string, outputPath: string) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to download file from ${url}`);
    }

    const fileContent = await response.arrayBuffer();
    await Deno.writeFile(outputPath, new Uint8Array(fileContent));
}

const url = "https://utfs.io/f/617a393b-9627-4271-9750-0785e509c121-uw5q9w.srt";
const outputPath = "./subfile.srt";

await downloadFile(url, outputPath);
console.log("File downloaded successfully.");