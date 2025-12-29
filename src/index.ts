import { desktopFile, getFavicon } from "./utils";
import { mkdir } from "fs/promises";

const prompt = async (message: string, example?: string) => {
  process.stdout.write(`${message}\n`);
  if (example) {
    process.stdout.write(`(${example})\n`);
  }
  process.stdout.write('-> ');
  for await (const line of console) {
    return line;
  }
  return;
}

const writeImageFile = async (url: string, filePath: string) => {
  const response = await fetch(url);
  if (!response.ok) throw Error("http status error");

  const array = await response.arrayBuffer();
  const byteArray = new Uint8Array(array);
  await Bun.write(filePath, byteArray);
  console.log("write image", filePath);
}

async function main() {
  const browser = await prompt("type your browser", "chromium, brave-browser-stable, google-chrome-stable...") || "chromium";
  const url = await prompt("type url");
  if (!url) {
    console.log("invalid url")
    return;
  }
  const name = await prompt("type application name");
  if (!name) {
    console.log("invalid name");
    return;
  }
  const favicon = getFavicon(url);
  const faviconPath = `${process.env.HOME}/.local/share/favicons`;
  // ディレクトリを作成
  await mkdir(faviconPath, { recursive: true, })
  console.log("created directory", faviconPath);

  const faviconFile = `${faviconPath}/${name}.ico`;
  // アイコンファイル書き込み
  await writeImageFile(favicon, faviconFile);

  const desktopFilePath = `${process.env.HOME}/.local/share/applications/webapp.${name.replaceAll(" ", ".")}.desktop`;
  await Bun.write(desktopFilePath, desktopFile(browser, name, faviconFile, url));
  console.log("created desktop file", desktopFilePath);
}

await main();
