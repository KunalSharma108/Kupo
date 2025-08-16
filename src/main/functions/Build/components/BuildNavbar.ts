import { BrowserWindow } from "electron";
import { sendLog } from "../sendLog";
import { getBgCSS } from "../lib/styles/background";
import { getLayoutCss } from "../lib/styles/layout";

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

  if (data.style) {
    if (data.style.styles) {
      let styleCss: string = ``;

      for (const key in data.style.styles) {
        if (key.toLowerCase() === 'background') {
          sendLog({ message: `Processing Navbar's style background`, type: 'normal' }, win);

          const background = {
            type: data.style.styles.background.type,
            color: data.style.styles.background.color,
            image: data.style.styles.background.image,
            gradient: data.style.styles.background.gradient,
            'image + gradient': data.style.styles.background['image + gradient']
          }

          const res = await getBgCSS({ background, directory });

          sendLog({ message: `Navbar's style ${res.msg}`, type: res.type }, win)

          styleCss += res.code;

        } else if (key.toLowerCase() === 'layout') {
          sendLog({ message: `Processing navbar's layout`, type: 'normal' }, win)

          const layout = {
            width: data.style.styles.layout.width as 'fit-content' | 'string',
            height: data.style.styles.layout.height as 'fit-content' | 'string',
            'max width': data.style.styles.layout['max width'] as 'fit-content' | 'string' | 'none',
            'max height': data.style.styles.layout['max height'] as 'fit-content' | 'string' | 'none'
          }

          if (data.style.styles.layout['vertical align'] || data.style.styles.layout['horizontal align']) {
            sendLog(
              {
                message: 'Navbar Styling will skip vertical and horizontal align because its a child property and navbar is a parent component.',

                type: 'warning'
              },
              win)
          }

          const res = await getLayoutCss({ layout: layout, win });

          sendLog({ message: res.msg, type: res.type }, win);

          console.log(res)
        } else {
          sendLog({ message: `Couldn't recognize navbar's ${key} style attribute`, type: 'error' }, win)
        }
      }
    } else {
      sendLog({ message: `Navbar's Styling data doesn't exist`, type: 'error' }, win)
    }
  } else {
    sendLog({ message: `Navbar's Styling and Hover styling data doesn't exist`, type: 'error' }, win)
  }

  return { htmlBlock: html, cssBlock: css }
}