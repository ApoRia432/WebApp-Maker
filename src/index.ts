import { desktopFile, getFavicon, prompt, writeImageFile } from "./utils";
import { mkdir } from "fs/promises";

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
