import { getProps } from "../../lib/presets/getProps";
import { sendLog } from "../../sendLog";
import { getCSS } from "../getCss";

export async function getNavLogoCss({ data, win, directory }: getProps): Promise<string> {
  let css = '';
  let navLogoClassName = 'nav-logo';

  if (data.logo.style) {
    if (data.logo.style.styles) {
      let navLogoStyleCSS = await getCSS({
        styleContent: 'navbar logo',
        styleType: 'styles',
        style: data.logo.style.styles, win, directory
      });

      if (navLogoStyleCSS.code?.trim() !== '') {
        css += `.${navLogoClassName} {\n${navLogoStyleCSS.code}\n}`;
      } else {
        sendLog({ message: 'No Style css of Navbar logo was generated.', type: 'warning' }, win)
      }
    } else {
      sendLog({ message: `Navbar's logo's Styling data doesn't exist`, type: 'error' }, win)
    }

    if (data.logo.style.hoverStyles) {
      let navLogoHoverStyleCSS = await getCSS({
        styleContent: 'navbar',
        styleType: 'hoverStyles',
        style: data.logo.style.hoverStyles, win, directory
      });

      if (navLogoHoverStyleCSS.code?.trim() !== '') {
        css += `\n.${navLogoClassName}:hover {\n${navLogoHoverStyleCSS.code}\n}`;
      } else {
        sendLog({ message: 'No Hover style css of Navbar logo was generated', type: 'warning' }, win)
      }
    } else {
      sendLog({ message: `Navbar's logo's hover style data doesn't exist`, type: 'error' }, win)
    }
  } else {
    sendLog({ message: `Navbar's logo's Styling and Hover styling data doesn't exist`, type: 'error' }, win)
  }

  css += `.nav-logo > img { height: inherit; width: inherit;}`;

  return css
}