import { getProps } from "../../lib/presets/getProps";
import { sendLog } from "../../sendLog";

export async function getHeroButtonHtml({ data, win }: getProps): Promise<string> {
  let html: string = '';
  let count: number = 1;

  let buttonHTML: string = '';

  if (!data.buttons) {
    sendLog({ message: 'Button data in Hero doesn\'t exist', type: 'error' }, win);
    return '';
  }

  let allCenter: boolean = true;

  for (const button of data.buttons) {
    if (button.style.styles.layout['horizontal align'].toLowerCase() !== 'center') {
      allCenter = false;
    }
  }

  for (const buttonData of data.buttons) {
    let className = `hero-button-${count}`
    let align = buttonData.style.styles.layout['horizontal align'].toLowerCase();

    if (align !== 'left' && align !== 'center' && align !== 'right') {
      sendLog({ message: `The horizontal align style in button number ${count} is invalid.`, type: 'error' }, win);
    }

    align = allCenter ? '' : align;

    buttonHTML += `<a class='${className} ${align}' href='${buttonData.link}' target='_blank'>${buttonData.label}</a>`

    count++;
  }

  html += `<div class='hero-button'>${buttonHTML}</div>`

  return html;
}