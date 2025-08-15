import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {

    contextBridge.exposeInMainWorld('electronAPI', {
      minimize: () => ipcRenderer.send('window-minimize'),
      maximize: () => ipcRenderer.send('window-maximize'),
      close: () => ipcRenderer.send('window-close'),
      fetchProjects: () => ipcRenderer.invoke('fetchProjects'),
      AddProject: (data: {name: string}) => ipcRenderer.invoke("AddProject", data),
      renameProject: (data: {prevName: string, newName: string}) => ipcRenderer.invoke("renameProject", data),
      deleteProject: (data: {name: string}) => ipcRenderer.invoke('deleteProject', data),
      fetchConfig: (data: {name: string}) => ipcRenderer.invoke('fetchConfig', data),
      updateConfig: (data: {name: string, data: any}) => ipcRenderer.invoke('updateConfig', data),
      selectImage: () => ipcRenderer.invoke('selectImage'),
      selectDir: () => ipcRenderer.invoke('selectDir'),
      startBuild: (data: {project: string, directory: string}) => ipcRenderer.invoke('startBuild', data),
      onBuildLog: (callback: (log: any) => void) => {
        ipcRenderer.on('build-log', (_event, log) => callback(log));
      },
      removeBuildLogListener: () => {
        ipcRenderer.removeAllListeners('build-log');
      }
    });

    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
