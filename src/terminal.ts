import * as vscode from 'vscode';
import { Command } from './command';

export async function executeCommand(command: Command): Promise<void> {
    const path = command.path ? command.path : "${workspaceFolder}";
    const terminal = vscode.window.createTerminal({ name: command.name, cwd: path });

    terminal.show();
    terminal.sendText(command.command);
}
