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
      SignUp: (data: {email: string, password: string}) => ipcRenderer.invoke("SignUp", data),
      LogIn: (data: {email: string, password:string}) => ipcRenderer.invoke("LogIn", data),
      CheckAuth: () => ipcRenderer.invoke("CheckAuth"),
      minimize: () => ipcRenderer.send('window-minimize'),
      maximize: () => ipcRenderer.send('window-maximize'),
      close: () => ipcRenderer.send('window-close'),
      AddProject: (data: {name: string}) => ipcRenderer.invoke("AddProject", data),
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
