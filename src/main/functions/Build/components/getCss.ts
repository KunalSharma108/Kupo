import { BrowserWindow } from "electron";
import { sendLog } from "../sendLog";
import { getBgCSS } from "../lib/styles/background";
import { getLayoutCss } from "../lib/styles/layout";
import { getBorderCSS } from "../lib/styles/border";
import { getTransition } from "../lib/styles/Transition";
import { getFont } from "../lib/styles/font";
import { getMargin } from "../lib/styles/margin";
import { getPadding } from "../lib/styles/padding";
import { getShadow } from "../lib/styles/shadow";

interface getCssProps {
  styleContent: 'navbar' | 'navbar logo' | 'navbar link' | 'hero' | 'hero text' | 'hero button' | 'feature' | 'feature block' | 'feature title' | 'feature desc' | 'footer';
  styleType: 'styles' | 'hoverStyles'

  style: any;

  win: BrowserWindow
  directory: string;
}

interface returnGetCssProps {
  success: boolean;
  msg: string;
  code: string | null;
}

export async function getCSS({ styleContent, styleType, style, win, directory }: getCssProps): Promise<returnGetCssProps> {
  const writtenStyleType = styleType === 'hoverStyles' ? 'hover style' : 'style';

  try {
    let styleCss = '';

    for (const key in style) {
      if (style[key] === false || style[key] === 'undefined' || style[key] === undefined) {
        sendLog({
          message: `Skipping ${writtenStyleType} ${key} in ${styleContent} because its value is either false or undefined`,
          type: "warning"
        },
          win);

        continue
      }

      if (key.toLowerCase() === 'background') {
        sendLog({ message: `Processing ${styleContent}'s ${writtenStyleType} background`, type: 'normal' }, win);

        const background = {
          type: style.background.type,
          color: style.background.color,
          image: style.background.image,
          gradient: style.background.gradient,
          'image + gradient': style.background['image + gradient']
        }

        const res = await getBgCSS({ background, directory });

        if (res.success) {
          sendLog({ message: `${styleContent}'s  ${res.msg}`, type: res.type }, win);
          styleCss += res.code + ' ';
        } else {
          console.log(res)
        }
      } else if (key.toLowerCase() === 'layout') {
        sendLog({ message: `Processing ${styleContent}'s layout`, type: 'normal' }, win)

        const layout = {
          "vertical align": style.layout['vertical align']?.toLowerCase() as 'top' | 'center' | 'bottom' | 'undefined' | null,
          width: style.layout.width as 'fit-content' | 'string',
          height: style.layout.height as 'fit-content' | 'string',
          'max width': style.layout['max width'] as 'fit-content' | 'string' | 'none',
          'max height': style.layout['max height'] as 'fit-content' | 'string' | 'none'
        }

        const res = await getLayoutCss({ layout: layout, win });

        if (res.success) {
          sendLog({ message: `${styleContent}'s  ${res.msg}`, type: res.type }, win);
          styleCss += res.code + ' ';
        } else {
          console.log(res)
        }
      } else if (key.toLowerCase() === 'border') {
        sendLog({ message: `processing ${styleContent}'s border styling`, type: 'normal' }, win);

        const border = {
          'border color': style.border['border color'] as string,
          'border width': style.border['border width'] as string,
          'border style': style.border['border style'] as 'none' | 'dotted' | 'dashed' | 'solid',
          'border radius': style.border['border radius'] as string,
        }

        const res = await getBorderCSS({ border, win });

        if (res.success) {
          sendLog({ message: `${styleContent}'s  ${res.msg}`, type: res.type }, win);
          styleCss += res.code + ' ';
        } else {
          console.log(res)
        }
      } else if (key.toLowerCase() === 'transition') {
        sendLog({ message: `processing ${styleContent}'s transition ${writtenStyleType} property`, type: 'normal' }, win);

        const transition = {
          'transition duration': style.transition['transition duration'] as number,
          'transition style': style.transition['transition style'] as 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'undefined'
        }
        const res = await getTransition({ transition, win });

        if (res.success) {
          sendLog({ message: `${styleContent}'s  ${res.msg}`, type: res.type }, win);
          styleCss += res.code + ' ';
        } else {
          console.log(res)
        }
      } else if (key.toLowerCase() === 'font') {
        sendLog({ message: `processing ${styleContent}'s font ${writtenStyleType} property`, type: 'normal' }, win);

        const font = {
          'font color': style.font['font color'] as string,
          'font family': style.font['font family'] as string,
          'font weight': style.font['font weight'] as number,
          'font size': style.font['font size'] as string
        }

        const res = await getFont({ font, win });

        if (res.success) {
          styleCss += `${res.code} `;
          sendLog({ message: `${styleContent}'s ${writtenStyleType} ${res.msg}`, type: res.type }, win);
        } else {
          console.log(res)
        }

      } else if (key.toLowerCase() === 'margin') {
        sendLog({ message: `processing ${styleContent}'s margin ${writtenStyleType} property`, type: 'normal' }, win);

        const margin = {
          'margin top': style.margin['margin top'],
          'margin bottom': style.margin['margin bottom'],
          'margin right': style.margin['margin right'],
          'margin left': style.margin['margin left']
        }

        const res = await getMargin({ margin, win });

        if (res.success) {
          styleCss += `${res.code} `;
          sendLog({ message: `${styleContent}'s ${writtenStyleType} ${res.msg}`, type: res.type }, win);
        } else {
          console.log(res)
        }

      } else if (key.toLowerCase() === 'padding') {
        sendLog({ message: `processing ${styleContent}'s padding ${writtenStyleType} property`, type: 'normal' }, win);

        const padding = {
          'padding top': style.padding['padding top'],
          'padding bottom': style.padding['padding bottom'],
          'padding right': style.padding['padding right'],
          'padding left': style.padding['padding left']
        }

        const res = await getPadding({ padding, win });

        if (res.success) {
          styleCss += `${res.code} `;
          sendLog({ message: `${styleContent}'s ${writtenStyleType} ${res.msg}`, type: res.type }, win);
        } else {
          console.log(res)
        }

      } else if (key.toLowerCase() === 'shadow') {
        sendLog({ message: `processing ${styleContent}'s shadow ${writtenStyleType} property`, type: 'normal' }, win);

        const shadow = {
          'offset x': style.shadow['offset x'],
          'offset y': style.shadow['offset y'],
          'blur radius': style.shadow['blur radius'],
          'spread radius': style.shadow['spread radius'],
          color: style.shadow.color,
          inset: style.shadow.inset,
        }

        const res = await getShadow({ shadow, win });

        if (res.success) {
          styleCss += `${res.code} `;
          sendLog({ message: `${styleContent}'s ${writtenStyleType} ${res.msg}`, type: res.type }, win);
        } else {
          console.log(res)
        }
      } else {
        sendLog({
          message: `Couldn't recognize ${styleContent}'s ${key} ${writtenStyleType} attribute`,
          type: 'error'
        }, win)
      }
    }

    return { success: true, msg: `Successfully built ${writtenStyleType} properties of ${styleContent}`, code: styleCss.trim() }

  } catch (error) {
    sendLog({ message: `There was an error while processing ${writtenStyleType} properties of ${styleContent}`, type: 'error' }, win);

    return { success: false, msg: `There was an error: ${error}`, code: null }
  }
}