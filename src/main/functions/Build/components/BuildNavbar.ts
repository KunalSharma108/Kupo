import { BrowserWindow } from "electron";
import { sendLog } from "../sendLog";
import { getCSS } from "./getCss";

interface returnProps {
  htmlBlock: string;
  cssBlock: string;
}

interface navbarProps {
  data: any;
  win: BrowserWindow;
  directory: string;
}

export async function buildNavbar({ data, win, directory }: navbarProps): Promise<returnProps> {
  let html: string = ``;
  let css: string = ``;

  sendLog({ message: 'Building Navbar...', type: 'normal' }, win);

  let navbarClassName = 'navbar';

  if (data.style) {
    if (data.style.styles) {
      let navbarStyleCSS = await getCSS({styleContent: 'navbar', styleType: 'styles', style: data.style.styles, win, directory});

      console.log(navbarStyleCSS)

      css += `${navbarStyleCSS.code}`;
    } else {
      sendLog({ message: `Navbar's Styling data doesn't exist`, type: 'error' }, win)
    }
  } else {
    sendLog({ message: `Navbar's Styling and Hover styling data doesn't exist`, type: 'error' }, win)
  }

  return { htmlBlock: html, cssBlock: css }
}