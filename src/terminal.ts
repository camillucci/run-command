import * as vscode from "vscode";
import { Command } from "./command";
import { DEFAULT_PATH } from "./constants";

/**
 * Create a new terminal if one with the `command.name` is not available.
 * Execute the `command.command` from the `command.path` in the terminal.
 * @param command The command to execute.
 */
export async function executeCommand(command: Command): Promise<void> {
  const path = command.path ? command.path : DEFAULT_PATH;
  const terminal =
    vscode.window.terminals.find((t) => t.name === command.name) ??
    vscode.window.createTerminal({ name: command.name, cwd: path });

  terminal.show();
  terminal.sendText(command.command);
}
