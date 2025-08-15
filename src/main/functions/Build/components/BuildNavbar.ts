import { BrowserWindow } from "electron";
import { sendLog } from "../sendLog";

interface returnProps {
  htmlBlock: string;
  cssBlock: string;
}

interface navbarProps {
  data: any;
  win: BrowserWindow;
}

export async function buildNavbar({data, win}: navbarProps): Promise<returnProps> {

  sendLog({message: 'Building Navbar...', type: 'normal'}, win)
  console.log(data)

  return {htmlBlock: `<div class='navbar'></div>`, cssBlock: `navbar { font-size: ${data.style.styles.font["font size"]} }`}
}