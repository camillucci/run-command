import * as vscode from "vscode";
import { Command } from "./command";

const DEFAULT_PATH: string = "${workspaceFolder}";

export async function executeCommand(command: Command): Promise<void> {
  const path = command.path ? command.path : DEFAULT_PATH;
  const terminal =
    vscode.window.terminals.find((t) => t.name === command.name) ??
    vscode.window.createTerminal({ name: command.name, cwd: path });

  terminal.show();
  terminal.sendText(command.command);
}
