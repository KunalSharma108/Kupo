import { BrowserWindow } from "electron";
import { sendLog } from "../../sendLog";
import { cssReturnProps } from "../template/props";

interface layoutProps {
  layout: {
    'vertical align'?: 'top' | 'center' | 'bottom' | 'undefined' | null;
    width: 'fit-content' | string;
    height: 'fit-content' | string;
    'max width': 'fit-content' | string | 'none';
    'max height': 'fit-content' | string | 'none'
  }

  win: BrowserWindow;
}

export async function getLayoutCss({ layout, win }: layoutProps): Promise<cssReturnProps> {
  let css = '';

  for (const val in layout) {
    if (layout[val] === 'undefined' || layout[val] === undefined || layout[val] === 'Default' || layout[val] === 'none') continue;

    if (val === 'vertical align' && layout["vertical align"] !== 'undefined' && layout["vertical align"] !== null) {
      css += ` display: flex; flex-direction: column; `;

      let flexValue = layout["vertical align"] === 'top' ? 'flex-start' : layout["vertical align"] === 'center' ? 'center' : 'flex-end';

      css += ` justify-content: ${flexValue}; `;
    }

    if (val === 'width' || val === 'height') {
      if (layout[val] === 'fit-content') {
        css += ` ${val}: fit-content;`

      } else if (typeof layout[val] === 'string' && layout[val] !== 'fit-content') {
        const numValue = layout[val].split('-')[0];
        const metric = layout[val].split('-')[1];

        css += ` ${val}: ${numValue}${metric}; `
      } else {
        sendLog({ message: `the layout property ${val} carries an unexpected value: ${layout[val]}`, type: 'error' }, win)
      }
    } else if (val === 'max width' || val === 'max height') {
      const newValue = val.replace(' ', '-')

      if (layout[val] === 'fit-content') {
        css += ` ${newValue}: fit-content;`
      } else if (typeof layout[val] === 'string' && layout[val] !== 'fit-content') {
        const numValue = layout[val].split('-')[0];
        const metric = layout[val].split('-')[1];

        css += ` ${newValue}: ${numValue}${metric}; `
      } else {
        sendLog({ message: `the layout property ${val} carries an unexpected value: ${layout[val]}`, type: 'error' }, win)
      }

    } else {
      sendLog({ message: `layout property ${val} has an unexpected value`, type: 'error' }, win)
    }
  }

  return { success: true, msg: 'Layout is done', type: 'normal', code: css }
}