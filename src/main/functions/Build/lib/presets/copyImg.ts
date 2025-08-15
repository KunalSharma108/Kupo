import path from "path";
import fs from "fs"

interface copyImgProps {
  imgPath: string,
  destPath: string
}

export async function copyImg({ imgPath, destPath }: copyImgProps):
  Promise<{ success: boolean, msg: string, type: 'normal' | 'warning' | 'error', baseName?: string }> {

  try {
    const imageName = path.basename(imgPath);
    const dest = path.join(destPath, imageName);

    fs.copyFileSync(imgPath, dest);

    return { success: true, msg: 'successfully copied the image to the root directory', type: 'normal', baseName: imageName };
  } catch (err) {
    console.error("Failed to copy background image:", err);
    return { success: false, msg: 'there was an error while copying the image.', type: 'error' };
  }
}