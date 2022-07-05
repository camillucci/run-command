import * as vscode from "vscode";
import { Command } from "./command";

const ADD_NEW_COMMAND: string = "Add new command...";

interface CommandQuickPickItem extends vscode.QuickPickItem {
  command: Command;
}

export async function showCommandsPick(
  commands: Command[]
): Promise<Command | undefined> {
  let pickItems = getPickItems(commands.filter((c) => c.command !== ""));
  pushAddNewCommand(pickItems);

  const picked = await vscode.window.showQuickPick(pickItems, {
    matchOnDescription: true,
  });

  if (!picked || !picked.command) {
    return;
  }

  return picked.command;
}

function getPickItems(commands: Command[]): CommandQuickPickItem[] {
  return commands.map<CommandQuickPickItem>((command) => {
    return {
      command: command,
      label: command.name || command.command.trim(),
      description: command.name ? command.command.trim() : "",
    };
  });
}

function pushAddNewCommand(pickItems: CommandQuickPickItem[]) {
  pickItems.push({
    command: { command: "" },
    label: ADD_NEW_COMMAND,
  });
}
