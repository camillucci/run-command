import { window } from "vscode";
import { Command } from "./command";
import { updateConfiguration } from "./configuration";
import { DEFAULT_PATH } from "./constants";
import { commandInputBox, nameInputBox, pathInputBox } from "./input-boxes";

/**
 * Create a new command.
 * @param command The command command.
 * @param name The optional command name.
 * @param path The optional command path.
 * @param parameters The optional command parameters.
 * @returns The newly created command.
 */
function createNewCommand(
  command: string,
  name: string,
  path: string,
  parameters?: string[],
): Command {
  const newCommand: Command = {
    command: command.trim(),
    name: name.trim().length !== 0 ? name.trim() : command,
    path: path.trim().length !== 0 ? path.trim() : DEFAULT_PATH,
    parameters: parameters ?? [],
  };

  return newCommand;
}

/**
 * Show input boxes to decide command, name, path and parameters of the new
 * command. If all four are chosen, or default values are used, create a new
 * command and update Visual Studio Code configuration.
 * @returns The completion of the operation.
 */
export async function addNewCommand(): Promise<void> {
  const command = await window.showInputBox(commandInputBox());
  if (command === undefined || command.trim().length === 0) {
    return;
  }

  const name = await window.showInputBox(nameInputBox(command));
  if (name === undefined) {
    return;
  }

  const path = await window.showInputBox(pathInputBox());
  if (path === undefined) {
    return;
  }

  const newCommand = createNewCommand(command, name, path);
  updateConfiguration(newCommand);
}
