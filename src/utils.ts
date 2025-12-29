export const prompt = async (message: string, example?: string) => {
  process.stdout.write(`${message}\n`);
  if (example) {
    process.stdout.write(`(${example})\n`);
  }
  process.stdout.write('-> ');
  for await (const line of console) {
    process.stdout.write('\n');
    return line;
  }
  return;
}

export const writeImageFile = async (url: string, filePath: string) => {
  const response = await fetch(url);
  if (!response.ok) throw Error("http status error");

  const array = await response.arrayBuffer();
  const byteArray = new Uint8Array(array);
  await Bun.write(filePath, byteArray);
  console.log("write image", filePath);
}

export const desktopFile = (browser: string, name: string, icon: string, url: string) => {
  return `[Desktop Entry]
Type=Application
Version=1.0
Name=${name}
Comment=WebApp
Exec=${browser} --new-window --app="${url}"
Icon=${icon}
`;
}

export const getFavicon = (url: string): string => {
  const domain = new URL(url).hostname;
  return `https://icons.duckduckgo.com/ip3/${domain}.ico`;
}

