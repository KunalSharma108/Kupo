import path from "path";
import { defaultProjectDir } from "./Project";
import fs from 'fs'

export async function fetchConfig(name: string): Promise<{ exists: boolean, data: any }> {
  const configPath = path.join(defaultProjectDir, name, 'Kupo.config.json');

  if (!fs.existsSync(configPath)) {
    return { exists: false, data: false }
  } else {
    const file = await fs.promises.readFile(configPath, 'utf-8');

    return { exists: true, data: JSON.parse(file) }
  }
}

export async function updateConfig(name: string, data: any): Promise<{ done: boolean }> {
  try {
    const configPath = path.join(defaultProjectDir, name, 'Kupo.config.json');
    const json = JSON.stringify(data, null, 2);
    await fs.promises.writeFile(configPath, json, 'utf-8');
    return { done: true };

  } catch (err) {
    console.error("Failed to update config:", err);
    return { done: false };
  }
}