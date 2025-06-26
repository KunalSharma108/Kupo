import { app } from "electron";
import path from "path";
import fs from "fs";

export async function addProject(name: string): Promise<{ path: string }> {
  const defaultProjectDir = path.join(app.getPath("documents"), "KupoProjects");

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
