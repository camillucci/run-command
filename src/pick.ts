import * as vscode from 'vscode';
import { Command } from './command';

export interface CommandQuickPickItem extends vscode.QuickPickItem {
    command: Command;
}

export async function showCommandsPick(commands: Command[]): Promise<Command | undefined> {
    const pickItems = getPickItems(commands);

    if (pickItems.length === 0) {
        return;
    }

    const picked = await vscode.window.showQuickPick(pickItems, { matchOnDescription: true });

    if (!picked || !picked.command) {
        return;
    }

    return picked.command;
}

function getPickItems(commands: Command[]): CommandQuickPickItem[] {
    return commands.map<CommandQuickPickItem>(command => {
        return {
            command: command,
            label: command.name || command.command.trim(),
            description: command.name ? command.command.trim() : ""
        };
    });
}
