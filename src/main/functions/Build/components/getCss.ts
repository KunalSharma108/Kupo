import { BrowserWindow } from "electron";
import { sendLog } from "../sendLog";
import { getBgCSS } from "../lib/styles/background";
import { getLayoutCss } from "../lib/styles/layout";
import { getBorderCSS } from "../lib/styles/border";
import { getTransition } from "../lib/styles/getTransition";

interface getCssProps {
  styleContent: 'navbar' | 'hero' | 'feature' | 'feature';
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

        sendLog({ message: `${styleContent}'s  ${res.msg}`, type: res.type }, win)

        styleCss += res.code + ' ';

      } else if (key.toLowerCase() === 'layout') {
        sendLog({ message: `Processing ${styleContent}'s layout`, type: 'normal' }, win)

        const layout = {
          width: style.layout.width as 'fit-content' | 'string',
          height: style.layout.height as 'fit-content' | 'string',
          'max width': style.layout['max width'] as 'fit-content' | 'string' | 'none',
          'max height': style.layout['max height'] as 'fit-content' | 'string' | 'none'
        }

        if (style.layout['vertical align'] || style.layout['horizontal align']) {
          continue;
        }

        const res = await getLayoutCss({ layout: layout, win });

        sendLog({ message: `${styleContent}'s ${res.msg}`, type: res.type }, win);

        if (res.success) styleCss += res.code + ' ';

      } else if (key.toLowerCase() === 'border') {
        sendLog({ message: `processing ${styleContent}'s border styling`, type: 'normal' }, win);

        const border = {
          'border color': style.border['border color'] as string,
          'border width': style.border['border width'] as string,
          'border style': style.border['border style'] as 'none' | 'dotted' | 'dashed' | 'solid',
          'border radius': style.border['border radius'] as string,
        }

        const res = await getBorderCSS({ border, win });

        sendLog({ message: `${styleContent}'s ${res.msg}`, type: res.type }, win);

        if (res.success) styleCss += ` ${res.code}`;
      } else if (key.toLowerCase() === 'transition') {
        sendLog({ message: `processing ${styleContent}'s transition ${writtenStyleType} property`, type: 'normal' }, win);

        const transition = {
          'transition duration': style.transition['transition duration'] as number,
          'transition style': style.transition['transition style'] as 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'undefined'
        }
        const res = await getTransition({transition, win});

        if (res.success) {
          sendLog({message: `${styleContent}'s ${res.msg}`, type:'normal'}, win);
          styleCss += res.code + ' ';
        }
      } else if (key.toLowerCase() === 'font') {
        //! COMPLETEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE THISSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
      } else {
        sendLog({
          message: `Couldn't recognize ${styleContent}'s ${key} ${writtenStyleType} attribute`,
          type: 'error'
        }, win)
      }
    }

    return { success: true, msg: `Successfully built ${writtenStyleType} properties of ${styleContent}`, code: styleCss }

  } catch (error) {
    sendLog({ message: `There was an error while processing ${writtenStyleType} properties of ${styleContent}`, type: 'error' }, win);

    return { success: false, msg: `There was an error: ${error}`, code: null }
  }
}