const processes: [
  { pid?: number; exitCode: number | null },
  (() => void) | undefined
][] = [];

process.on("SIGINT", function () {
  for (const proc of processes) {
    if (proc[0].pid && proc[0].exitCode === null)
      try {
        process.kill(-proc[0].pid);
      } catch {}
    if (proc[1]) proc[1]();
  }
});

export function addProcess(
  proc: { pid?: number; exitCode: number | null },
  callback?: () => void
) {
  processes.push([proc, callback]);
}
