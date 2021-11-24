import { red } from "../build/utils/log";

if (!/pnpm/.test(process.env.npm_execpath || "")) {
  red(
    "\u001b[33mThis repository requires using pnpm as the package manager " +
      "for scripts to work properly.\u001b[39m\n"
  );
  process.exit(1);
}
