import { BrowserWindow } from "electron";
import { cssReturnProps } from "../template/props";
import { colors } from "../presets/color";
import { sendLog } from "../../sendLog";

interface borderProps {
  border: {
    'border color': string;
    'border width': string;
    'border style': 'none' | 'dotted' | 'dashed' | 'solid';
    'border radius': string;
  };
  win: BrowserWindow;
}

export async function getBorderCSS({ border, win }: borderProps): Promise<cssReturnProps> {
  let css: string = '';

  if (border["border color"] !== 'none' && border["border style"] !== 'none' && border["border width"] !== '0-px') {
    let widthNumber = border["border width"].split('-')[0];
    let widthMetric = border["border width"].split('-')[1];
    let style = border["border style"];

    let color = border["border color"][0] === '#' ? border["border color"] : colors[border["border color"]];

    if (color === undefined) {
      sendLog({
        message: 'border property has invalid border color. Only setting the border radius',
        type: 'error'
      },
        win);

    } else {
      css += ` 
        border: ${widthNumber}${widthMetric} ${style} ${color}
      `
    }
  } else {
    sendLog({
      message: 'One of the border properties except border radius is either none or set to 0px, Hence skipping the border styling, only proceeding with the radius one.',
      type: 'warning'
    }, win)
  }

  css += ` border-radius: ${border["border radius"]}`;

  return { success: true, msg: 'Border styling is done.', type: 'normal', code: css }
}