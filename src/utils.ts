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

