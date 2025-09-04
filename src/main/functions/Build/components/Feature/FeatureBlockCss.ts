import { getProps } from "../../lib/presets/getProps";
import { sendLog } from "../../sendLog";
import { getCSS } from "../getCss";

export async function getFeatureBlockCss({ data, win, directory }: getProps): Promise<string> {
  let css: string = `.feature-block {display: flex; width:100%;} .feature-block > div {flex: 1; min-width:0px;} .feature-image {flex: 1; display: flex; justify-content: center; align-items: center; object-fit: contain;} .feature-block-content {display:flex; flex-direction: column; gap:0px;} .feature-block-content > div.left { text-align: left; } .feature-block-content > div.center { text-align: center; } .feature-block-content > div.right { text-align: right; } .feature-image img { max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; display: block; }`;

  let count: number = 1;

  if (!data.blocks) {
    sendLog({ message: 'The Feature blocks do not exist.', type: 'error' }, win);
  } else {
    for (const block of data.blocks) {
      let featureClassName: string = `feature-block-${count}`;
      let featureTitleClassName: string = `feature-title-${count}`;
      let featureDescClassName: string = `feature-desc-${count}`;

      if (!block.style.styles) {
        sendLog({ message: `The block sytle doesn\'t exist of feature number ${count}`, type: 'error' }, win);
      } else {
        let blockCss = await getCSS({
          styleContent: 'feature block',
          styleType: 'styles',
          style: block.style.styles,
          win,
          directory,
        });

        if (blockCss.success && blockCss.code?.trim() !== '') {
          css += `.${featureClassName} {${blockCss.code}}`;
        }
      }

      if (!block.style.hoverStyles) {
        sendLog({ message: `The block hover sytle doesn\'t exist of feature number ${count}`, type: 'error' }, win);
      } else {
        let blockCss = await getCSS({
          styleContent: 'feature block',
          styleType: 'hoverStyles',
          style: block.style.hoverStyles,
          win,
          directory,
        });

        if (blockCss.success && blockCss.code?.trim() !== '') {
          css += `.${featureClassName}:hover {${blockCss.code}}`
        }
      }

      if (!block.title.style.styles) {
        sendLog({ message: `The title Style doesn\'t exist in feature block number ${count}`, type: 'error' }, win);
      } else {
        let blockTitleCss = await getCSS({
          styleContent: 'feature title',
          styleType: 'styles',
          style: block.title.style.styles,
          win,
          directory
        });

        if (blockTitleCss.success && blockTitleCss.code?.trim() !== '') {
          css += `.${featureTitleClassName} {${blockTitleCss.code}}`;
        }
      }

      if (!block.title.style.hoverStyles) {
        sendLog({ message: `The title Style doesn\'t exist in feature block number ${count}`, type: 'error' }, win);
      } else {
        let blockTitleCss = await getCSS({
          styleContent: 'feature title',
          styleType: 'hoverStyles',
          style: block.title.style.hoverStyles,
          win,
          directory
        });

        if (blockTitleCss.success && blockTitleCss.code?.trim() !== '') {
          css += `.${featureTitleClassName}:hover {${blockTitleCss.code}}`;
        }
      }

      if (!block.description.style.styles) {
        sendLog({ message: `The description style doesn\'t exist in feature number ${count}`, type: 'error' }, win);
      } else {
        let blockDescCss = await getCSS({
          styleContent: 'feature desc',
          styleType: 'styles',
          style: block.description.style.styles,
          win,
          directory
        });

        if (blockDescCss.success && blockDescCss.code?.trim() !== '') {
          css += `.${featureDescClassName} {${blockDescCss.code}}`;
        }
      }

      if (!block.description.style.hoverStyles) {
        sendLog({ message: `The description style doesn\'t exist in feature number ${count}`, type: 'error' }, win);
      } else {
        let blockDescCss = await getCSS({
          styleContent: 'feature desc',
          styleType: 'hoverStyles',
          style: block.description.style.hoverStyles,
          win,
          directory
        });

        if (blockDescCss.success && blockDescCss.code?.trim() !== '') {
          css += `.${featureDescClassName}:hover {${blockDescCss.code}}`;
        }
      }

      count++;
    }
  }

  return css;
}