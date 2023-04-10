import { Terminal, window } from "vscode";
import { Command } from "./command";
import { DEFAULT_PATH } from "./constants";

function findTerminal(command: Command): Terminal | undefined {
  return window.terminals.find((t) => t.name === command.name);
}

function getTerminal(command: Command): Terminal {
  const path = command.path ? command.path : DEFAULT_PATH;
  let terminal = findTerminal(command);
  return terminal ?? window.createTerminal({ name: command.name, cwd: path });
}

/**
 * Create a new terminal if one with the `command.name` is not available.
 * Execute the `command.command` from the `command.path` in the terminal.
 * @param command The command to execute.
 */
export async function executeCommand(command: Command): Promise<void> {
  const terminal = getTerminal(command);
  terminal.show();
  terminal.sendText(command.command);
}
