import path from "path";
import { colors } from "../presets/color";
import fs from "fs"
import { copyImg } from "../presets/copyImg";

interface bgProps {
  background: {
    type: 'color' | 'image' | 'gradient' | 'image + gradient' | false,
    color: any;
    image: any;
    gradient: any;
    'image + gradient': any;
  }

  directory: string;
}

export async function getBgCSS(
  { background, directory }: bgProps):
  Promise<{ success: boolean, msg: string, type: 'normal' | 'warning' | 'error', code?: string }> {

  console.log(background)

  if (background.type === false) return { success: false, msg: 'Background type is false', type: 'warning' }

  if (background.type === 'color') {
    if (background.color[0] === '#') {
      return { success: true, msg: 'Custom color background done.', type: 'normal', code: `background: ${background.color}` }
    } else {
      if (colors[background.color] !== undefined) {
        return { success: true, msg: "color background done", type: 'normal', code: `background: #${colors[background.color]}` }
      } else {
        return { success: false, msg: 'Color background failed.', type: 'error' }
      }
    }
  } else if (background.type === 'image') {
    const res = await copyImg({ imgPath: String(background.image), destPath: directory });

    if (res.success && res.baseName !== undefined) {
      const css = `
        background-image: url('${res.baseName}');
        background-position: center;
        background-size: fit;
        background-repeat:no-repeat;
      `;

      return { success: true, msg: 'Background image is done.', type: 'normal', code: css }
    } else {
      return { success: false, msg: res.msg, type: res.type }
    }

  } else if (background.type === 'gradient') {
    const gradientDirection = background.gradient.split(' ')[background.gradient.split(' ').length - 1];

    const gradientColors = background.gradient.split(' ').filter((_, idx) => idx !== background.gradient.split(' ').length - 1);

    console.log(gradientColors, gradientDirection)

    return {
      success: true,
      msg: 'gradient background done.',
      type: 'normal',
      code: `background: linear-gradient(${gradientDirection}, ${gradientColors.join(", ")});`
    }
  }

}