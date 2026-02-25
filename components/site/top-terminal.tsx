"use client";

import { useEffect, useMemo, useState } from "react";

type TerminalLogLevel = "ok" | "out" | "scan" | "warn" | "error" | "info";

type TerminalLog = {
  level: TerminalLogLevel;
  message: string;
};

type TerminalFlow = {
  command: string;
  logs: TerminalLog[];
};

const flows: TerminalFlow[] = [
  {
    command: "npm run profile:sync",
    logs: [
      { level: "ok", message: "profile loaded" },
      { level: "ok", message: "links parsed" },
      { level: "ok", message: "skills indexed" }
    ]
  },
  {
    command: "aws configure list",
    logs: [
      { level: "out", message: "profile default" },
      { level: "out", message: "region ap-northeast-1" },
      { level: "ok", message: "credentials resolved" }
    ]
  },
  {
    command: "terraform plan -out=tfplan",
    logs: [
      { level: "scan", message: "providers initialized" },
      { level: "warn", message: "2 deprecated arguments detected" },
      { level: "ok", message: "plan completed (0 to change)" }
    ]
  }
];

const maxLogLines = Math.max(...flows.map((flow) => flow.logs.length));

const levelClassMap: Record<TerminalLogLevel, string> = {
  ok: "terminal-level-ok",
  out: "terminal-level-out",
  scan: "terminal-level-scan",
  warn: "terminal-level-warn",
  error: "terminal-level-error",
  info: "terminal-level-info"
};

type Phase = "typing" | "logs" | "pause";

export function TopTerminal(): JSX.Element {
  const [flowIndex, setFlowIndex] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [shownLogs, setShownLogs] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");

  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const activeFlow = flows[flowIndex];
  const command = activeFlow.command;
  const visibleCommand = command.slice(0, typedChars);
  const status =
    phase === "typing"
      ? { label: "INPUT", className: "terminal-status-input", note: "typing command" }
      : phase === "logs"
        ? { label: "STREAMING", className: "terminal-status-stream", note: `${shownLogs}/${activeFlow.logs.length} logs` }
        : { label: "IDLE", className: "terminal-status-idle", note: "awaiting next job" };

  useEffect(() => {
    if (reducedMotion) {
      setTypedChars(command.length);
      setShownLogs(activeFlow.logs.length);
      setPhase("pause");
      return;
    }

    let timer: number | undefined;

    if (phase === "typing") {
      if (typedChars < command.length) {
        timer = window.setTimeout(() => setTypedChars((prev) => prev + 1), 65);
      } else {
        timer = window.setTimeout(() => setPhase("logs"), 240);
      }
    } else if (phase === "logs") {
      if (shownLogs < activeFlow.logs.length) {
        timer = window.setTimeout(() => setShownLogs((prev) => prev + 1), 320);
      } else {
        timer = window.setTimeout(() => setPhase("pause"), 900);
      }
    } else {
      timer = window.setTimeout(() => {
        setFlowIndex((prev) => (prev + 1) % flows.length);
        setTypedChars(0);
        setShownLogs(0);
        setPhase("typing");
      }, 1200);
    }

    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, [activeFlow.logs.length, command.length, phase, reducedMotion, shownLogs, typedChars]);

  return (
    <section className="terminal-shell h-[292px] rounded-2xl md:h-[312px]">
      <div className="terminal-header">
        <div className="flex items-center gap-1.5">
          <span className="terminal-dot terminal-dot-red" />
          <span className="terminal-dot terminal-dot-yellow" />
          <span className="terminal-dot terminal-dot-green" />
        </div>
        <span className="terminal-title">portfolio-terminal</span>
        <span className="terminal-session">session #{flowIndex + 1}</span>
      </div>

      <div className="terminal-body flex-1 px-4 py-3 font-mono text-xs leading-6 text-[var(--text-secondary)]">
        <p className="terminal-command">
          <span className="terminal-user">takahiro@portfolio</span>
          <span className="terminal-sign">$</span>
          <span className="min-w-0 truncate">{visibleCommand}</span>
          {!reducedMotion && phase === "typing" ? <span className="terminal-caret animate-pulse" /> : null}
        </p>

        <div className="mt-3 space-y-1">
          {Array.from({ length: maxLogLines }).map((_, index) => {
            const line = activeFlow.logs[index];
            const isVisible = Boolean(line) && (reducedMotion || index < shownLogs);

            return (
              <p key={`${flowIndex}-slot-${index}`} className={`terminal-log transition-opacity duration-200 ${isVisible ? "opacity-100" : "opacity-0"}`}>
                {line ? (
                  <>
                    <span className={`terminal-level ${levelClassMap[line.level]}`}>{line.level}</span>
                    <span className="terminal-message">{line.message}</span>
                  </>
                ) : (
                  <span className="terminal-message">&nbsp;</span>
                )}
              </p>
            );
          })}
        </div>
      </div>

      <div className="terminal-footer">
        <span className={`terminal-status ${status.className}`}>{status.label}</span>
        <span className="terminal-footer-meta">{status.note}</span>
      </div>
    </section>
  );
}
