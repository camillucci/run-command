import { QuickPickItem, window } from "vscode";
import { Command } from "./command";
import { ADD_NEW_COMMAND } from "./constants";

interface CommandQuickPickerItem extends QuickPickItem {
  command: Command;
}

/**
 * Given a list of commands, return the corresponding list of picker items.
 * @param commands The list of commands to display.
 * @returns The list of picker items.
 */
function getPickerItems(commands: Command[]): CommandQuickPickerItem[] {
  return commands.map<CommandQuickPickerItem>((command) => {
    return {
      command: command,
      label: command.name || command.command.trim(),
      description: command.name ? command.command.trim() : "",
    };
  });
}

/**
 * Adds to the list of commands the "Add new command" option.
 * @param pickItems Existing commands to choose from.
 */
function pushAddNewCommand(pickItems: CommandQuickPickerItem[]): void {
  pickItems.push({
    command: { command: ADD_NEW_COMMAND },
    label: ADD_NEW_COMMAND,
  });
}

/**
 * Display the command picker to the user, return the picked command if any.
 * @param commands Existing commands to display.
 * @returns The command picked by the user.
 */
export async function showCommandPicker(
  commands: Command[]
): Promise<Command | undefined> {
  const pickerItems = getPickerItems(commands.filter((c) => c.command !== ""));
  pushAddNewCommand(pickerItems);

  const picked = await window.showQuickPick(pickerItems, {
    matchOnDescription: true,
  });

  return picked?.command;
}
