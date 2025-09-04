import { getProps } from "../../lib/presets/getProps";
import { sendLog } from "../../sendLog";
import { getCSS } from "../getCss";

export async function getFeatureCss({ data, win, directory }: getProps): Promise<string> {
  let css: string = '';
  let className = 'feature';

  if (!data.style.styles) {
    sendLog({ message: 'The style data of Feature doesn\'t exist', type: 'error' }, win);
  } else {
    let featureCss = await getCSS({
      styleContent: 'feature',
      styleType: 'styles',
      style: data.style.styles,
      win,
      directory
    });

    if (featureCss.success && featureCss.code?.trim() !== '') {
      featureCss.code = `display: flex; flex-direction: column; align-items:center; justify-content:center; gap:0px; ${featureCss.code}`;
      css += `.${className} {${featureCss.code}}`;
    }
  }

  if (!data.style.hoverStyles) {
    sendLog({ message: 'The hover style data of Feature doesn\'t exist', type: 'error' }, win);
  } else {
    let featureCss = await getCSS({
      styleContent: 'feature',
      styleType: 'hoverStyles',
      style: data.style.hoverStyles,
      win,
      directory
    });

    if (featureCss.success && featureCss.code?.trim() !== '') {
      css += `.${className}:hover {${featureCss.code}}`;
    }
  }

  return css;
}