import { getProps } from "../../lib/presets/getProps";
import { sendLog } from "../../sendLog";

export async function getHeroTextHtml({ data, win }: getProps): Promise<string> {
  let html: string = '';
  let count: number = 1;

  let textHTML: string = '';

  if (!data.texts) {
    sendLog({ message: 'Text data in Hero doesn\'t exist', type: 'error' }, win);
    return '';
  }

  for (const textData of data.texts) {
    let className = `hero-text-${count}`
    let align = textData.style.styles.layout['horizontal align'].toLowerCase();

    if (align !== 'left' && align !== 'center' && align !== 'right') {
      sendLog({ message: `The horizontal align style in text number ${count} is invalid.`, type: 'error' }, win);
      align = 'center';
    }

    textHTML += `<div class='${className}  ${align}'>${textData.text}</div>`

    count++;
  }

  html += `<div class='hero-text'>${textHTML}</div>`

  return html;
}