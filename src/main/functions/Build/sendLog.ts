import { BrowserWindow } from "electron";

interface logsProps {
  message: string;
  type: 'normal' | 'warning' | 'error'
}

export async function sendLog(log: logsProps, win: BrowserWindow) {
  win.webContents.send('build-log', log)
}