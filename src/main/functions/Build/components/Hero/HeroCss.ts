import { getProps } from "../../lib/presets/getProps";
import { sendLog } from "../../sendLog";
import { getCSS } from "../getCss";

export async function getHeroCss({ data, win, directory }: getProps): Promise<string> {
  sendLog({ message: 'Processing Hero\'s css', type: 'normal' }, win)
  let css: string = '';
  let className: string = 'hero';

  if (!data.style) {
    sendLog({ message: 'The styling of Hero doesn\'t exist', type: 'error' }, win);
    return ''
  }

  if (!data.style.styles) {
    sendLog({ message: 'The normal styling of Hero doesn\'t exist', type: 'error' }, win);
    return ''
  }

  if (!data.style.hoverStyles) {
    sendLog({ message: 'The Hover styling of Hero doesn\'t exist', type: 'error' }, win);
    return ''
  }

  let heroCss = await getCSS({
    styleContent: 'hero',
    styleType: 'styles',
    style: data.style.styles,
    win,
    directory
  });

  let hoverHeroCss = await getCSS({
    styleContent: 'hero',
    styleType: 'hoverStyles',
    style: data.style.hoverStyles,
    win,
    directory
  });

  if (heroCss.success && heroCss.code?.trim() !== '') {
    heroCss.code = `display: flex; flex-direction: column; ${heroCss.code}`;
    css += `.${className} {${heroCss.code}}`;
  }

  if (hoverHeroCss.success && hoverHeroCss.code?.trim() !== '') {
    css += `.${className}:hover {${hoverHeroCss.code}}`;
  }

  return css
}