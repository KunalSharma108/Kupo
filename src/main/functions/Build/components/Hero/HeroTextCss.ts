import { getProps } from "../../lib/presets/getProps";
import { sendLog } from "../../sendLog";
import { getCSS } from "../getCss";

export async function getHeroTextCss({ data, win, directory }: getProps): Promise<string> {
  sendLog({ message: 'Processing Hero\'s Text\'s css', type: 'normal' }, win)
  let css: string = '';
  let count = 1;

  if (!data.texts) {
    sendLog({ message: 'Hero\'s Texts do not exist', type: 'error' }, win);
    return '';
  }

  css += `.hero-text { width: 100%; height:fit-content; display: flex; flex-direction: column; } .hero-text > div { flex: 0 0 auto; } .hero-text > div.left { margin-right: auto; } .hero-text > div.center { position: absolute; left: 50%; transform: translateX(-50%); } .hero-text > div.right { margin-left: auto; }
  `;

  for (const textData of data.texts) {
    let className = `hero-text-${count}`;

    if (textData.style.styles) {
      let TextStyle = await getCSS({
        styleContent: 'hero text',
        styleType: 'styles',
        style: textData.style.styles,
        win,
        directory
      });

      if (TextStyle.success && TextStyle.code?.trim() !== '') {
        css += `.${className} {${TextStyle.code}}`;
      }
    } else {
      sendLog({ message: `style doesn't exist of hero text number ${count}`, type: 'error' }, win);
    }

    if (textData.style.hoverStyles) {
      let TextStyle = await getCSS({
        styleContent: 'hero text',
        styleType: 'hoverStyles',
        style: textData.style.hoverStyles,
        win,
        directory
      });

      if (TextStyle.success && TextStyle.code?.trim() !== '') {
        css += `.${className}:hover {${TextStyle.code}}`;
      }
    } else {
      sendLog({ message: `hover style doesn't exist of hero text number ${count}`, type: 'error' }, win);
    }
  }

  return css
}