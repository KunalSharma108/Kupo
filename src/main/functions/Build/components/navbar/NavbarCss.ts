import { sendLog } from "../../sendLog";
import { getCSS } from "../getCss";
import { navbarProps } from "./BuildNavbar";

export async function getNavbarCss({ data, win, directory }: navbarProps): Promise<string> {
  let css: string = '';
  let navbarClassName = 'navbar';

  let childAlignmentCss = `
  .navbar > div {flex: 0 0 auto;} .navbar > div.left {margin-right: auto;} .navbar > div.center { position: absolute; left: 50%; transform: translateX(-50%); } .navbar > div.right { margin-left: auto;  }
  `;
  
  if (data.style) {
    if (data.style.styles) {
      let navbarStyleCSS = await getCSS({ styleContent: 'navbar', styleType: 'styles', style: data.style.styles, win, directory });

      if (navbarStyleCSS.code?.trim() !== '') {
        navbarStyleCSS.code = `
        display:flex; justify-content:space-between; align-items: center; position: relative; ${navbarStyleCSS.code}
        `.trim();

        css += `.${navbarClassName} {\n${navbarStyleCSS.code}\n}`;
      } else {
        sendLog({ message: 'No Style css of Navbar was generated.', type: 'warning' }, win)
      }

    } else {
      sendLog({ message: `Navbar's Styling data doesn't exist`, type: 'error' }, win)
    }

    if (data.style.hoverStyles) {
      let navbarHoverStyleCSS = await getCSS({
        styleContent: 'navbar',
        styleType: 'hoverStyles',
        style: data.style.hoverStyles, win, directory
      });

      if (navbarHoverStyleCSS.code?.trim() !== '') {
        css += `\n.${navbarClassName}:hover {\n${navbarHoverStyleCSS.code}\n}`;
      } else {
        sendLog({ message: 'No Hover style css of Navbar was generated', type: 'warning' }, win)
      }

    } else {
      sendLog({ message: `Navbar's hover style data doesn't exist`, type: 'error' }, win)
    }
  } else {
    sendLog({ message: `Navbar's Styling and Hover styling data doesn't exist`, type: 'error' }, win)
  }

  css += childAlignmentCss;

  return css
}