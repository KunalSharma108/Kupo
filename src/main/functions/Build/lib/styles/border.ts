import { BrowserWindow } from "electron";
import { cssReturnProps } from "../template/props";
import { colors } from "../presets/color";
import { sendLog } from "../../sendLog";

interface borderProps {
  border: {
    'border color': string | false | undefined | 'undefined';
    'border width': string | false | undefined | 'undefined';
    'border style': 'none' | 'dotted' | 'dashed' | 'solid' | false | undefined | 'undefined';
    'border radius': string;
  };
  win: BrowserWindow;
}

export async function getBorderCSS({ border, win }: borderProps): Promise<cssReturnProps> {


  let css: string = '';

  if (
    border["border color"] !== 'none' &&
    border["border color"] !== false &&
    border["border color"] !== undefined &&
    border["border color"] !== 'undefined' &&
    border["border style"] !== 'none' &&
    border["border style"] !== false &&
    border["border style"] !== undefined &&
    border["border style"] !== 'undefined' &&
    border["border width"] !== '0-px' &&
    border["border width"] !== false &&
    border["border width"] !== undefined &&
    border["border width"] !== 'undefined'
  ) {
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
      message: 'One of the border properties except border radius is set to non-valid value, Hence skipping the border styling, only proceeding with the radius one.',
      type: 'warning'
    }, win)
  }

  let radiusNumber = border["border radius"].split('-')[0];
  let radiusMetric = border["border radius"].split('-')[1];

  css += ` border-radius: ${radiusNumber}${radiusMetric}`;

  return { success: true, msg: 'Border styling is done.', type: 'normal', code: css }
}