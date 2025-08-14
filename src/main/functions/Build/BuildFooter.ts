import { BrowserWindow } from "electron";

interface buildFooterProps {
  data: any;
  win: BrowserWindow;
}

export async function buildFooter({data, win}: buildFooterProps) {
  console.log(data)
  win.webContents.send('build-log', 'YOOOOO CHAT JUST GOT THE FOOTER"S DATA, NOW ME GONNA PROCESS IT.')
}