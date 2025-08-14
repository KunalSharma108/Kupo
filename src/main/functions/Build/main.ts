import { BrowserWindow } from "electron";

interface buildMainProps {
  project: string;
  win: BrowserWindow
}

export async function buildMain({project, win}: buildMainProps) {
  console.log(project)

  win.webContents.send("build-log", 'Calling it from main.ts')

}