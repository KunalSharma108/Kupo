import { getProps } from "../../lib/presets/getProps";
import { sendLog } from "../../sendLog";

export async function getNavLinksHTML({ data, win} :getProps): Promise<string> {
  let html: string = ''
  let count: number = 1;
  let linkHTML: string = '';

  let alignmentDiv: string = '';

  if (data.navLinkStyle.styles.layout['horizontal align']) {
    const align = data.navLinkStyle.styles.layout['horizontal align'].toLowerCase();

    if (align === 'left') {
      alignmentDiv = 'left';
    } else if (align === 'center') {
      alignmentDiv = 'center';
    } else if (align === 'right') {
      alignmentDiv = 'right';
    } else {
      sendLog({ message: 'Horizontal align of Links doesn\'t have a valid value', type: 'error' }, win)
    }

  } else {
    sendLog({ message: 'Horizontal align doesn\'t exist in Links styling.', type: 'error' }, win)
  }

  if (data.navLinks) {
    for (const val of data.navLinks) {
      linkHTML += `<a class='nav-link-${count}' href='${val.link}' target='_blank'>${val.label}</a>\n`;
      count++
    }
    sendLog({ message: 'Successfuly generated the HTML for navbar links', type: 'normal' }, win)
  } else {
    sendLog({ message: `Navbar's links dont exist.`, type: 'error' }, win)
  }

  html = `<div class='nav-links ${alignmentDiv}'> ${linkHTML} </div>`;
  return html
}
