import { app } from "electron";
import path from "path";
import fs from "fs";

export async function addProject(name: string): Promise<{ path: string }> {
  const defaultProjectDir = path.join(app.getPath("documents"), "Kupo", "Projects");

  if (!fs.existsSync(defaultProjectDir)) {
    fs.mkdirSync(defaultProjectDir, { recursive: true });
  }

  const projectPath = path.join(defaultProjectDir, name);

  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath, { recursive: true });
  }

  const configPath = path.join(projectPath, "config.json");

  const defaultConfig = {
    CreatedAt: new Date().toISOString(),
    Sections: {
      Navbar: {
        enabled: true,
        sticky: false,
      },
    },
  };

  fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), "utf-8");

  return { path: projectPath };
}

export async function fetchProjects(): Promise<string[]> {
  console.log('recieved');

  const defaultProjectDir = path.join(app.getPath("documents"), "Kupo", "Projects");

  if (!fs.existsSync(defaultProjectDir)) {
    console.log('returning');
    return [];
  }

  try {
    const files = await fs.promises.readdir(defaultProjectDir, { withFileTypes: true });

    const folders = files
      .filter((f) => f.isDirectory())
      .map((f) => f.name);

    console.log('Fetched');
    return folders;
  } catch (err) {
    console.error('Failed to read projects:', err);
    return [];
  }
}
