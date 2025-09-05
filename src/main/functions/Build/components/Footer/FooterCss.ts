import { getProps } from "../../lib/presets/getProps";
import { sendLog } from "../../sendLog";
import { getCSS } from "../getCss";

export async function getFooterCss({ data, win, directory }: getProps): Promise<string> {
  let css: string = `.footer { display: flex; align-items: center; } .footer > div.left {margin-right: auto;} .footer > div.center {margin-right: auto; margin-left: auto;} .footer > div.right {margin-left: auto;}`;

  let className: string = `footer`;

  if (!data.style.styles) {
    sendLog({message: `The style data of footer doesn't exist`, type:'error'}, win);
  } else {
    let footerCss = await getCSS({
      styleContent: 'footer',
      styleType: 'styles',
      style: data.style.styles,
      win,
      directory
    });

    if (footerCss.success && footerCss.code?.trim() !== '' && footerCss.code !== undefined) {
      css += `.${className} {${footerCss.code}}`
    }
  }


  if (!data.style.hoverStyles) {
    sendLog({ message: `The hover style data of footer doesn't exist`, type: 'error' }, win);
  } else {
    let footerCss = await getCSS({
      styleContent: 'footer',
      styleType: 'hoverStyles',
      style: data.style.hoverStyles,
      win,
      directory
    });

    if (footerCss.success && footerCss.code?.trim() !== '' && footerCss.code !== undefined) {
      css += `.${className}:hover {${footerCss.code}}`
    }
  }

  return css;
}