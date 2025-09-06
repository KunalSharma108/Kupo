import { getProps } from "../../lib/presets/getProps";
import { sendLog } from "../../sendLog";
import { getCSS } from "../getCss";

export async function getNavLinksCss({ data, win, directory }: getProps): Promise<string> {
  let css = '';
  let navLinksClassName = 'nav-links';

  css += `.${navLinksClassName} {display: flex;}`

  if (data.navLinkStyle) {
    if (data.navLinkStyle.styles) {
      let navLinksStyleCSS = await getCSS({
        styleContent: 'navbar logo',
        styleType: 'styles',
        style: data.navLinkStyle.styles, win, directory
      });

      if (navLinksStyleCSS.code?.trim() !== '' && navLinksStyleCSS.success) {
        css += `.${navLinksClassName} > a {\n${navLinksStyleCSS.code}\n}`;
      } else {
        sendLog({ message: 'No Style css of Navbar links was generated.', type: 'warning' }, win)
      }

    } else {
      sendLog({ message: `Navbar's logo's Styling data doesn't exist`, type: 'error' }, win)
    }

    if (data.navLinkStyle.hoverStyles) {
      let navLinksHoverStyleCSS = await getCSS({
        styleContent: 'navbar',
        styleType: 'hoverStyles',
        style: data.navLinkStyle.hoverStyles,
        win,
        directory
      });

      if (navLinksHoverStyleCSS.code?.trim() !== '' && navLinksHoverStyleCSS.success) {
        css += `\n.${navLinksClassName} > a:hover {\n${navLinksHoverStyleCSS.code}\n}`;
      } else {
        sendLog({ message: 'No Hover style css of Navbar links was generated', type: 'warning' }, win)
      }

    } else {
      sendLog({ message: `Navbar's links' hover style data doesn't exist`, type: 'error' }, win)
    }
  } else {
    sendLog({ message: `Navbar's links' Styling and Hover styling data doesn't exist`, type: 'error' }, win)
  }

  let valCount: number = 1;

  for (const val of data.navLinks) {
    let valClassName = `nav-link-${valCount}`;

    if (val.style) {
      if (val.style.styles) {
        let valCss = await getCSS({
          styleContent: 'navbar link',
          styleType: 'styles',
          style: val.style.styles,
          win,
          directory
        })

        if (valCss.code?.trim() !== '' && valCss.success) {
          valCss.code = valCss.code?.replace(/;(?=\s|$)/g, " !important;") || "";
          css += `.${valClassName} {\n${valCss.code}\n}`;
        } else {
        }
      } else {
        sendLog({ message: `navbar's link's style doesn't exist`, type: 'error' }, win);
      }

      if (val.style.hoverStyles) {
        let valCss = await getCSS({
          styleContent: 'navbar link',
          styleType: 'hoverStyles',
          style: val.style.hoverStyles,
          win,
          directory
        })

        if (valCss.code?.trim() !== '' && valCss.success) {
          valCss.code = valCss.code?.replace(/;(?=\s|$)/g, " !important;") || "";
          css += `.${valClassName}:hover {\n${valCss.code}\n}`;
        } else {
        }
      } else {
        sendLog({ message: `navbar's link's hover style doesn't exist`, type: 'error' }, win);
      }
    }

    valCount++
  }

  return css
}