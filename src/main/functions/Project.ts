import { app } from "electron";
import path from "path";
import fs from "fs";

export const defaultProjectDir = path.join(app.getPath("documents"), "Kupo", "Projects");

export async function fetchProjects(): Promise<string[]> {
  if (!fs.existsSync(defaultProjectDir)) {
    return [];
  }

  try {
    const files = await fs.promises.readdir(defaultProjectDir, { withFileTypes: true });

    const folders = files
      .filter((f) => f.isDirectory())
      .map((f) => f.name);

    return folders;
  } catch (err) {
    return [];
  }
}

export async function addProject(name: string): Promise<{ path: string }> {
  if (!fs.existsSync(defaultProjectDir)) {
    fs.mkdirSync(defaultProjectDir, { recursive: true });
  }

  const projectPath = path.join(defaultProjectDir, name);

  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath, { recursive: true });
  }

  const configPath = path.join(projectPath, "Kupo.config.json");

  const defaultConfig = {
    createdAt: new Date().toISOString(),
    sections: {
      sectionOrders: []
    },
  };

  fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), "utf-8");

  return { path: projectPath };
}

export async function renameProject(prevName: string, newName: string): Promise<boolean> {
  const oldPath = path.join(defaultProjectDir, prevName);
  const newPath = path.join(defaultProjectDir, newName);

  try {
    await fs.promises.rename(oldPath, newPath);
    return true;
  } catch (err) {
    return false;
  }
}

export async function deleteProject(name: string): Promise<boolean> {
  const fullDir = path.join(defaultProjectDir, name);

  try {
    await fs.promises.rm(fullDir, { recursive: true, force: true });
    return true;
  } catch (error) {
    return false;
  }
}


