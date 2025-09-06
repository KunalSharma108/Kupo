# Kupo

Kupo is a desktop application that lets you create static websites with ease.  
It provides plenty of customization options for different components, including **Navbar**, **Hero**, **Feature sections**, **Footer**.

## Getting the Latest Version

You can download the latest stable release of Kupo for your platform:

- **Windows:** Download the `.exe` installer from the [Releases](https://github.com/<your-username>/Kupo/releases) page.
- **Linux:** Download the `.AppImage` or `.deb` package from the same [Releases](https://github.com/<your-username>/Kupo/releases) page.

Simply run the installer (Windows) or follow your distro’s installation steps (Linux) to start using Kupo.

## Features

Kupo is designed to help non-technical users create static websites quickly and easily. Its core features include:

- **Four main components:** Navbar, Hero, Feature sections, and Footer — enough to build a typical website.  
- **Config-driven customization:** Every aspect, from content to CSS, can be modified. Default configurations are provided for each component when added, so you can get started immediately.  
- **Flexible backgrounds:** Components can use solid colors, gradients, images, or a combination of image + gradient — not just static colors.  
- **Font options:** Multiple fonts are provided to style your text the way you want.  
- **Exploration-friendly:** Many additional customization options are left for users to discover, giving full creative freedom.  

## Usage / Quick Start

1. **Open Kupo** – The app opens with a clean interface.  
2. **Project Management** – Use the sidebar on the left to **create a new project** or **select an existing project** to edit.  
3. **Edit Components** – Once a project is selected, the main central area displays the **configurations for your website components**. You can modify content, styles, and layouts directly from here.  
4. **Build Your Site** – After customizing your site:
   - **Select the project** you want to build in.  
   - Choose the **output folder** where the `index.html` and associated files will be generated.  
   - Kupo will **copy all images and assets** used in the project into the output folder and generate the static website.  
5. **Export / Deploy** – Once the build is complete, the folder contains a ready-to-use static website that can be deployed anywhere.  

## Screenshots / Demo

Here’s a quick look at Kupo in action:

### App Interface
![App Screenshot]()

### Example Site Built with Kupo
![Demo Site]()


## Contributing

Contributions are welcome! Whether it’s fixing bugs, adding new features, or improving the docs, your help is appreciated.  

### How to Contribute
1. **Fork** the repo  
2. **Clone** your fork  

```bash
git clone https://github.com/YOUR-USERNAME/Kupo.git
```  

3. **Create a new branch**  

```bash
git checkout -b feature-name
```  

4. **Make your changes** and commit them  

```bash
git commit -m "Add some feature"
```  

5. **Push** to your fork  

```bash
git push origin feature-name
```  

6. Open a **Pull Request** to the main repo:  
👉 [Kupo Repository](https://github.com/KunalSharma108/Kupo)

### Reporting Issues
If you find a bug or have a feature request, open an [issue here](https://github.com/KunalSharma108/Kupo/issues).

## 🛠️ Built With  

- **Electron + Vite + React + TypeScript** – the base stack for building Kupo.  
- **Electron Vite** – super fast build tooling for Electron apps. Learn more at [electron-vite.org](https://electron-vite.org/).  
- **Vanilla CSS** – no Tailwind (yet) because the setup gave me trouble, but everything still works fine.  

## 📖 Documentation / Tips (For Contributors & Developers)

### Frontend Overview
The frontend lives in the **`src/renderer`** folder. The entry point is `App.tsx`, which directs into the main **Dashboard** component.

#### Components Structure
- **Assets/** – Contains a few static images used across the UI.  
- **Build/** – Houses the build dialog logic and UI.  
  - `BuildDialog.tsx` – Controls which build step/page is visible (swipe-style navigation).  
  - `pages/` – Contains individual step pages of the build process.  
- **Dashboard/** – Core of the app’s UI.  
  - `NavDashboard.tsx`, `SideDashboard.tsx`, `MainDashboard.tsx` – Define the layout.  
  - `components/` – Reusable elements like `CustomToolTip.tsx` and dialogs.  
  - `RenderSection.tsx` – Critical: dynamically renders sections (Navbar, Hero, Feature, Footer).  
  - `StyleDialog.tsx` – Handles user CSS edits, pushing changes back via `updateData({})` in `MainDashboard.tsx`.  
- **Loading/** – Contains `LoadingOverlay.tsx` for showing loading states anywhere in the app.  
- **Styles/** – Individual CSS files per component (keeps styles scoped and maintainable).  

#### Config & Interfaces
- **Interface/** – Defines how data in config files is structured.  
  - **Default Sections/** – Default objects for `Navbar`, `Hero`, `Feature`, and `Footer`.  
    - Split into multiple files when configs are large (e.g., `navbarLinkStyle.ts`, `navbarLogoStyle.ts`).  
  - **Presets/** – Predefined style options (e.g., `style.ts`, `background.ts`, `fontFamily.ts`, `uiBlocks.ts`).  
  - **Types/** – TypeScript interfaces for each major component (Navbar, Hero, Feature, Footer).  
  - *In short: `default sections` = actual default objects; `types` = the shape/interface of those objects.*  

#### IPC Bridge
- **Lib/** – The IPC bridge.  
  - `ipc.ts` exposes Electron backend functions as simple frontend APIs (e.g. `window.electronAPI.sendData({ ... })` becomes just `sendData({ ... })`).  
  - Keeps frontend clean and abstracts away the verbose Electron API calls.  

#### Key Notes
- Configuration-driven: All changes (CSS + content) flow through the `updateData({})` function in `MainDashboard.tsx`.  
- Sections are modular and extendable — new sections can be added by following the `RenderSection` pattern.  
- IPC bridge in `lib/ipc.ts` is the main way frontend communicates with the backend.  

## License

This project is licensed under the [MIT License](./LICENSE).  
You’re free to use, modify, and distribute this software as long as the original license is included.

