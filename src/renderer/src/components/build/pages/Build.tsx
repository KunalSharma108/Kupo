import { startBuild } from '@renderer/lib/ipc';
import React, { useEffect, useRef, useState } from 'react'

interface buildProps {
  project: string | null;
  directory: string;
}

function Build({ project, directory }: buildProps): React.JSX.Element {
  interface logsProps {
    message: string;
    type: 'normal' | 'warning' | 'error'
  }

  const hasStarted = useRef(false);
  const [logs, setLogs] = useState<logsProps[]>([])

  if (project !== null && directory.trim() !== '' && hasStarted.current === false) {
    const response = startBuild({ project });

    hasStarted.current = true;

    console.log(response)
  }

  useEffect(() => {
    window.electronAPI.onBuildLog((log) => {
      setLogs(prev => [...prev, log]);
      console.log(log);
    });

    return () => {
      window.electronAPI.removeBuildLogListener();
    };
  }, []);

  return (
    <div>
      {logs.map((val, idx) => {
        return (
          <p>{val.message} {val.type} {idx}</p>
        )
      })}
    </div>
  )
}

export default Build
