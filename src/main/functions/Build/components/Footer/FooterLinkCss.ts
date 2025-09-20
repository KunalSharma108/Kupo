import { getProps } from "../../lib/presets/getProps";
import { sendLog } from "../../sendLog";
import { getCSS } from "../getCss";

export async function getFooterLinkCss({ data, win, directory }: getProps): Promise<string> {
  let css: string = '.footer-links {display: flex: flex-wrap: wrap; gap: 10px;} .footer-links a {flex: 0 0 auto;}';
  let className: string = `footer-links`;

  if (!data.globalDefaultButtonStyle.styles) {
    sendLog({ message: `The global style of footer links do not exist.`, type: 'error' }, win);
  } else {
    let globalFooterLinksCss = await getCSS({
      styleContent: 'footer links',
      styleType: 'styles',
      style: data.globalDefaultButtonStyle.styles,
      win,
      directory
    });

    if (globalFooterLinksCss.success && globalFooterLinksCss.code?.trim() !== '' && globalFooterLinksCss) {
      css += `.${className} > a {${globalFooterLinksCss.code}}`;
    }
  }

  if (!data.globalDefaultButtonStyle.hoverStyles) {
    sendLog({ message: `The global hover style of footer links do not exist.`, type: 'error' }, win);
  } else {
    let globalFooterLinksCss = await getCSS({
      styleContent: 'footer links',
      styleType: 'hoverStyles',
      style: data.globalDefaultButtonStyle.hoverStyles,
      win,
      directory
    });

    if (globalFooterLinksCss.success && globalFooterLinksCss.code?.trim() !== '' && globalFooterLinksCss) {
      css += `.${className} > a:hover {${globalFooterLinksCss.code}}`;
    }
  }

  if (!data.buttons) {
    sendLog({message: `The link's data in footer do not exist.`, type: 'error'}, win);
  } else {
    let count: number = 1;
    for (const link of data.buttons) {
      let linkClassName: string = `footer-link-${count}`;

      let linkCss = await getCSS({
        styleContent: 'footer links',
        styleType: 'styles',
        style: link.style.styles,
        win,
        directory
      });

      if (linkCss.success && linkCss.code?.trim() !== '' && linkCss.code) {
        linkCss.code = linkCss.code.replace(';', ' !important ;');
        css += `.${linkClassName} {${linkCss.code}}`;
      }

      let linkHoverCss = await getCSS({
        styleContent: 'footer links',
        styleType: 'hoverStyles',
        style: link.style.hoverStyles,
        win,
        directory
      });

      if (linkHoverCss.success && linkHoverCss.code?.trim() !== '' && linkHoverCss.code) {
        linkHoverCss.code = linkHoverCss.code.replace(';', ' !important ;');
        css += `.${linkClassName}:hover {${linkHoverCss.code}}`;
      }
      count++;
    }
  }
  
  return css;
}