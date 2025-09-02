import { getProps } from "../../lib/presets/getProps";
import { sendLog } from "../../sendLog";
import { getCSS } from "../getCss";

export async function getHeroButtonCss({ data, win, directory }: getProps): Promise<string> {
  sendLog({ message: 'processing hero\'s button\'s css', type: 'normal' }, win);
  let css: string = '';
  let count: number = 1;

  if (!data.buttons) {
    sendLog({ message: `button's data do not exist in hero's data`, type: 'normal' }, win);
    return '';
  }

  let allCenter: boolean = true;

  for (const buttonData of data.buttons) {
    let className: string = `hero-button-${count}`;

    if (buttonData.style.styles) {
      let buttonStyles = await getCSS({
        styleContent: 'hero button',
        style: buttonData.style.styles,
        styleType: 'styles',
        win,
        directory
      })

      if (buttonData.style.styles.layout['horizontal align'].toLowerCase() !== 'center') {
        allCenter = false;
      }

      if (buttonStyles.success && buttonStyles.code?.trim() !== '') {
        css += `.${className} {${buttonStyles.code}}`;
      }
    } else {
      sendLog({ message: `The style data doesn't exist of button number ${count}`, type: 'error' }, win)
    }

    if (buttonData.style.styles) {
      let buttonHoverStyles = await getCSS({
        styleContent: 'hero button',
        style: buttonData.style.hoverStyles,
        styleType: 'hoverStyles',
        win,
        directory
      })

      if (buttonHoverStyles.success && buttonHoverStyles.code?.trim() !== '') {
        css += `.${className}:hover {${buttonHoverStyles.code}}`;
      }
    } else {
      sendLog({ message: `The Hover style data doesn't exist of button number ${count}`, type: 'error' }, win)
    }

    count++;
  }

  let justifyContent = allCenter ? 'center' : 'space-between'

  css = `.hero-button {width: 100%; height: fit-content; display: flex; flex-direction: row; justify-content: ${justifyContent}; align-items: center; position: relative;} .hero-button > div { flex: 0 0 auto; } .hero-button > div.left { margin-right: auto; } .hero-button > div.center { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); } .hero-button > div.right { margin-left: auto; } ${css}`;

  return css
}