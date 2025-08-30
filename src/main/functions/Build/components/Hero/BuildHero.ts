import { BrowserWindow } from "electron";
import { sendLog } from "../sendLog";

interface returnProps {
  htmlBlock: string;
  cssBlock: string;
}

interface HeroProps {
  data: any;
  win: BrowserWindow;
}

export async function buildHero({ data, win }: HeroProps): Promise<returnProps> {
  sendLog({ message: 'Building Hero...', type: 'normal' }, win)

  return { htmlBlock: `<div class='hero'></div>`, cssBlock: `.hero  {font-size: ${data.style.styles.font['font size']}}`
  }
}