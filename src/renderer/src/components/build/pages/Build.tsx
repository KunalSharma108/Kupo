import { startBuild } from "@renderer/lib/ipc";
import React, { useEffect, useRef, useState } from "react";
import '../../styles/buildCss/build.css';
import '../../styles/fontFamily.css'

interface buildProps {
  project: string | null;
  directory: string;
}

interface logsProps {
  message: string;
  type: "normal" | "warning" | "error" | "done";
}

function Build({ project, directory }: buildProps): React.JSX.Element {
  const hasStarted = useRef(false);
  const [logs, setLogs] = useState<logsProps[]>([]);
  const progressTimer = useRef<NodeJS.Timeout | null>(null);
  const buildDone = useRef(false);

  if (project !== null && directory.trim() !== "" && hasStarted.current === false) {
    startBuild({ project, directory });
    hasStarted.current = true;
  }

  useEffect(() => {
    window.electronAPI.onBuildLog((log) => {
      setLogs((prev) => [...prev, log]);

      if (log.type === "done" && !buildDone.current) {
        buildDone.current = true;
      }
    });

    return () => {
      window.electronAPI.removeBuildLogListener();
      if (progressTimer.current) clearInterval(progressTimer.current);
    };
  }, []);

  return (
    <div className="kupo-build-container">
      <div className="kupo-build-console-wrapper">
        <div className="kupo-build-console">
          {logs.map((val, idx) => (
            <p key={idx} className={`kupo-build-log`}>
              <span className="kupo-console-pointer">{'>'}</span>
              <span className={`quicksand-font kupo-build-log-${val.type}`}>{val.message}</span>
            </p>
          ))}

          {!buildDone.current && (
            <div className="kupo-console-waiting">
              <span></span><span></span><span></span>
            </div>
          )}
        </div>
      </div>

      <div className="kupo-build-progress-bar">
        <div className={`kupo-build-progress-fill ${buildDone.current ? 'done' : ''}`} />
      </div>
    </div>
  );
}

export default Build;
