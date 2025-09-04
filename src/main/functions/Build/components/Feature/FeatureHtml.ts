import { copyImg } from "../../lib/presets/copyImg";
import { getProps } from "../../lib/presets/getProps";
import { sendLog } from "../../sendLog";

export async function getFeatureHtml({ data, win, directory }: getProps): Promise<string> {
  let html: string = '';
  let count: number = 1;

  if (!data.blocks) {
    sendLog({ message: 'The feature blocks do not exist', type: 'error' }, win);
  } else {

    let textLeft: boolean = data.startWith.split('-')[1] === 'left' ? true : false;

    for (const block of data.blocks) {
      let featureClassName: string = `feature-block-${count}`;
      let featureTitleClassName: string = `feature-title-${count}`;
      let featureDescClassName: string = `feature-desc-${count}`;

      let imgURL: string = '';

      if (block.imageURL.toLowerCase() !== 'false') {
        const res = await copyImg({
          imgPath: block.imageURL,
          destPath: directory
        });

        if (res.success && res.baseName?.trim() !== '' && res.baseName !== undefined) {
          imgURL = res.baseName;
        } else {
          sendLog({
            message: `There was a problem while copying the image of Feature block number ${count} to the root directory`,
            type: 'error'
          }, win);
        }
      }

      let titleAlign: 'left' | 'center' | 'right' = block.title.style.styles.layout['horizontal align'].toLowerCase();
      let descAlign: 'left' | 'center' | 'right' = block.description.style.styles.layout['horizontal align'].toLowerCase();

      html += textLeft ? `
      <div class='feature-block ${featureClassName}'>
        <div class='feature-block-content'>
          <div class='${featureTitleClassName} ${titleAlign}'>${block.title.text}</div>
          <div class='${featureDescClassName} ${descAlign}'>${block.description.text}</div>
        </div>
        <div class='feature-image'><img src='${imgURL}'></img></div>
      </div>
      ` : `
      <div class='feature-block ${featureClassName}'>
      <div class='feature-image'><img src='${imgURL}'></img></div>
      <div class='feature-block-content'>
        <div class='${featureTitleClassName} ${titleAlign}'>${block.title.text}</div>
        <div class='${featureDescClassName}' ${descAlign}>${block.description.text}</div>
      </div>
      </div>
      `
      
      textLeft = !textLeft;
      count++;
    }
  }

  return html;
}