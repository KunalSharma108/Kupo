import { getProps } from "../../lib/presets/getProps";
import { sendLog } from "../../sendLog";

export async function getFooterLinkHtml({ data, win }: getProps): Promise<string> {
  let html: string = '';

  let align: 'left' | 'center' | 'right' | undefined = data.globalDefaultButtonStyle.styles.layout['horizontal align'].toLowerCase();

  let LinkHtml: string = '';

  let count: number = 1;

  if (!data.buttons) {
    sendLog({ message: `Link's data of footer do not exist.`, type: 'error' }, win)
  } else {
    for (const link of data.buttons) {
      let className = `footer-link-${count}`;

      LinkHtml += `<a class='${className}' href='${link.link}' target='_blank'>${link.label}</a>`

      count++;
    }
  }


  html = `
    <div class='footer-links ${align ? align : 'left'}'>
      ${LinkHtml}
    </div>
  `

  return html;
}