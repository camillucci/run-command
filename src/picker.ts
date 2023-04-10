import { QuickPickItem, window } from "vscode";
import { Command } from "./command";
import { ADD_NEW_COMMAND } from "./constants";

interface CommandQuickPickerItem extends QuickPickItem {
  command: Command;
}

function getPickerItems(commands: Command[]): CommandQuickPickerItem[] {
  return commands.map<CommandQuickPickerItem>((command) => {
    return {
      command: command,
      label: command.name || command.command.trim(),
      description: command.name ? command.command.trim() : "",
    };
  });
}

function pushAddNewCommand(pickItems: CommandQuickPickerItem[]) {
  pickItems.push({
    command: { command: ADD_NEW_COMMAND },
    label: ADD_NEW_COMMAND,
  });
}

export async function showCommandPicker(commands: Command[]) {
  const pickerItems = getPickerItems(commands.filter((c) => c.command !== ""));
  pushAddNewCommand(pickerItems);

  const picked = await window.showQuickPick(pickerItems, {
    matchOnDescription: true,
  });

  return picked?.command;
}
