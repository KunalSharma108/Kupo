import { getProps } from "../../lib/presets/getProps";

export async function getFooterLinkHtml({ data, win, directory }: getProps): Promise<string> {
  let html: string = '';

  let align: 'left' | 'center' | 'right' | undefined = data.globalDefaultButtonStyle.styles.layout['horizontal align'].toLowerCase();

  let LinkHtml: string = '';

  let count: number = 1;

  for (const link of data.buttons) {
    let className = `footer-link-${count}`;

    LinkHtml += `<a class='${className}' href='${link.link}' target='_blank'>${link.label}</a>`

    count++;
  }

  html = `
    <div class='footer-links ${align ? align : 'left'}'>
      ${LinkHtml}
    </div>
  `

  return html;
}