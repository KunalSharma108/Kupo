import path from "path";
import { defaultProjectDir } from "./Project";
import fs from 'fs'

export async function fetchConfig(name:string): Promise<{exists: boolean, data: any}> {
  const configPath = path.join(defaultProjectDir, name, 'Kupo.config.json');

  if (!fs.existsSync(configPath)) {
    return {exists: false, data: false}
  }  else {
    const file = await fs.promises.readFile(configPath, 'utf-8');

    return {exists: true, data: JSON.parse(file)}
  }
}