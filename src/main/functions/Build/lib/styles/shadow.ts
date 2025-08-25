import { BrowserWindow } from "electron";
import { cssReturnProps } from "../template/props";
import { sendLog } from "../../sendLog";
import { colors } from "../presets/color";

interface shadowProps {
  shadow: {
    'offset x': string | 'undefined';
    'offset y': string | 'undefined';
    'blur radius': string | 'undefined';
    'spread radius': string | 'undefined';
    color: string | 'undefined';
    inset: boolean | 'undefined';
  },

  win: BrowserWindow;
}

export async function getShadow({ shadow, win }: shadowProps): Promise<cssReturnProps> {
  try {
    let css = '';

    if (shadow["offset x"] === 'undefined' ||
      shadow["offset y"] === 'undefined' ||
      shadow["blur radius"] === 'undefined' ||
      shadow["spread radius"] === 'undefined' ||
      shadow.color === 'undefined' ||
      shadow.inset === 'undefined' ||
      colors[shadow.color] === undefined
    ) {
      sendLog({ message: 'skipping Shadow css because all of them has to contain a valid value', type: 'warning' }, win);
      return { success: false, msg: 'skipping shadow css because all of them has to contain a valid value', type: 'warning' }
    } else {
      let xNum = shadow["offset x"].split('-')[0];
      let xMetric = shadow["offset x"].split('-')[1];

      let yNum = shadow["offset y"].split('-')[0];
      let yMetric = shadow["offset y"].split('-')[1];

      let spreadNum = shadow["spread radius"].split('-')[0];
      let spreadMetric = shadow["spread radius"].split('-')[1];

      let blurNum = shadow["blur radius"].split('-')[0];
      let blurMetric = shadow["blur radius"].split('-')[1];

      let color = shadow.color[0] === '#' ? shadow.color : `#${colors[shadow.color.toLowerCase()]}`;

      css = `box-shadow: ${xNum}${xMetric} ${yNum}${yMetric} ${blurNum}${blurMetric} ${spreadNum}${spreadMetric} ${color} ${shadow.inset}; `

      return { success: true, msg: 'shadow is done', type: 'normal', code: css };

    }
  } catch (error) {
    sendLog({ message: 'There was an error while generating shadow css', type: 'error' }, win);
    return { success: false, msg: `There was an error: ${error}`, type: 'error' };
  }
}