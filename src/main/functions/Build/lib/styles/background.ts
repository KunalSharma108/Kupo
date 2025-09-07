import { colors } from "../presets/color";
import { copyImg } from "../presets/copyImg";
import { cssReturnProps } from "../template/props";
import { hexToRgba } from "../presets/HexToRgb";

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

export async function getBgCSS({ background, directory }: bgProps): Promise<cssReturnProps> {
  if (background.type === false) return { success: false, msg: 'Background type is false', type: 'warning' }

  try {
    if (background.type === 'color' && background.color !== false) {
      if (background.color[0] === '#') {
        let rgbColor = hexToRgba(background.color);

        return { success: true, msg: 'Custom color background done. ✅', type: 'normal', code: `background: ${rgbColor};` }
      } else {
        if (colors[background.color.toLowerCase()] !== undefined) {
          let color = `#${colors[background.color.toLowerCase()]}`;
          return { success: true, msg: "color background done. ✅", type: 'normal', code: `background: ${color};` }
        } else {
          return { success: false, msg: 'Color background failed.', type: 'error' }
        }
      }
    } else if (background.type === 'image' && background.image !== false) {
      const res = await copyImg({ imgPath: String(background.image), destPath: directory });

      if (res.success && res.baseName !== undefined) {
        const css = `background-image: url('${res.baseName}'); background-position: center; background-size: fit; background-repeat:no-repeat;`;

        return { success: true, msg: 'Background image is done. ✅', type: 'normal', code: css.trim() }
      } else {
        return { success: false, msg: res.msg, type: res.type }
      }

    } else if (background.type === 'gradient' && background.gradient !== false) {
      const gradientDirection = background.gradient.split(' ')[background.gradient.split(' ').length - 1].replace(/-+/g, ' ');
      const gradientColors = background.gradient.split(' ').filter((_, idx) => idx !== background.gradient.split(' ').length - 1);

      const rgbaColors = gradientColors.map(val => hexToRgba(val));

      return {
        success: true,
        msg: 'gradient background done. ✅',
        type: 'normal',
        code: `background: linear-gradient(${gradientDirection}, ${rgbaColors.join(", ")}); `
      }

    } else if (background.type === 'image + gradient' && background["image + gradient"] !== false) {
      const imgPath: string = background["image + gradient"].split(',')[0];
      const gradientValues: string = background["image + gradient"].split(',')[1];

      const res = await copyImg({ imgPath: imgPath, destPath: directory });

      if (res.success && res.baseName !== undefined) {
        const gradientDirection = gradientValues.split(' ')[gradientValues.split(' ').length - 1].replace('-', ' ');
        const gradientColors = gradientValues.split(' ').filter((_, idx) => idx !== gradientValues.split(' ').length - 1);

        gradientColors.map((val) => {
          return hexToRgba(val);
        })

        const css = `background: linear-gradient(${gradientDirection}, ${gradientColors.join(", ")}), url('${res.baseName}'); background-position: center; background-size: cover; background-repeat: no-repeat; `;

        return { success: true, msg: 'Image + gradient background done. ✅', type: 'normal', code: css.trim() }
      } else {
        return { success: false, msg: res.msg, type: res.type }
      }
    } else {
      return { success: false, msg: `Background type is invalid or background type selected is false.`, type: 'error' }
    }
  } catch (error) {
    return { success: false, msg: `there was an error: ${error}`, type: 'error' }

  }
}