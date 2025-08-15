import { BrowserWindow } from "electron";
import { sendLog } from "./sendLog";
import { fetchConfig } from "../config";

interface buildMainProps {
  project: string;
  win: BrowserWindow
}

export async function buildMain({project, win}: buildMainProps) {
  console.log(project)
  sendLog({message: 'yooo chat sending form main.ts', type: 'normal'}, win);

  const data = await fetchConfig(project);

  console.log(data)
}