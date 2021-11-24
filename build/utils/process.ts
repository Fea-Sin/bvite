import { spawn } from "child_process";
import { proRoot } from "./paths";
import { green } from "./log";

export const run = async (command: string, cwd: string = proRoot) =>
  new Promise<void>((resolve, reject) => {
    const [cmd, ...args] = command.split(" ");
    green(`run: ${cmd} ${args.join(" ")}`);

    const app = spawn(cmd, args, {
      cwd,
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    const onProcessExit = () => app.kill("SIGHUP");

    app.on("close", (code) => {
      process.removeListener("exit", onProcessExit);

      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(`Command faild. \n Command; ${command} \n Code: ${code}`)
        );
      }
    });

    process.on("exit", onProcessExit);
  });
