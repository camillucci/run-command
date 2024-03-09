import { Terminal, window } from "vscode";
import { Command } from "./command";
import { DEFAULT_PATH } from "./constants";
import { valueInputBox } from "./input-boxes";

/**
 * Find, if it exists, a terminal with the given command name.
 * @param command The command to search.
 * @returns The found terminal, if any.
 */
function findTerminal(command: Command): Terminal | undefined {
  const name = command.name ?? command.command;
  return window.terminals.find((t) => t.name === name);
}

/**
 * Dispose,if it exists, a terminal with the given command name.
 * @param command The terminal to dispose.
 */
function disposeTerminal(command: Command): void {
  const terminal = findTerminal(command);
  terminal?.dispose();
}

/**
 * Create a new terminal with the given command name.
 * @param command Command to execute.
 * @returns The newly created terminal.
 */
function createTerminal(command: Command): Terminal {
  const name = command.name ?? command.command;
  const path = command.path ?? DEFAULT_PATH;
  return window.createTerminal({ name: name, cwd: path });
}

/**
 * Ask for parameter values to the user, and replace them accordingly.
 * @param command with parameters to be replaced.
 * @returns Command with value inserted by the user.
 */
async function getParametrizedCommand(command: Command): Promise<Command> {
  if (!command.parameters) {
    return command;
  }

  for (let parameter of command.parameters) {
    const value = await window.showInputBox(valueInputBox(parameter));
    command.command = command.command.replace(parameter, value ?? "");
  }

  return command;
}

/**
 * Create a new terminal if one with the `command.name` is not available.
 * Ask the user for `command.parameters` and replace them in the command.
 * Execute the `command.command` from the `command.path` in the terminal.
 * @param command The command to execute.
 */
export async function executeCommand(command: Command): Promise<void> {
  disposeTerminal(command);
  const terminal = createTerminal(command);
  const parametrizedCommand = await getParametrizedCommand(command);
  terminal.show();
  terminal.sendText(parametrizedCommand.command);
}
