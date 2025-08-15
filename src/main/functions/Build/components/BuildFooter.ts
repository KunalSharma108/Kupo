import { BrowserWindow } from "electron";
import { sendLog } from "../sendLog";

interface buildFooterProps {
  data: any;
  win: BrowserWindow;
}

export async function buildFooter({ data, win }: buildFooterProps) {
  console.log(data)

  sendLog({message:'YOO YOUR FOOTER IS UNDERWAY', type: 'normal'}, win)
}