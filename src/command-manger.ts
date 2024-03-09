import { window } from "vscode";
import { Command } from "./command";
import { updateConfiguration } from "./configuration";
import { DEFAULT_PATH } from "./constants";
import {
  commandInputBox,
  nameInputBox,
  parameterInputBox,
  pathInputBox,
} from "./input-boxes";

/**
 * Create a new command.
 * @param command The command command.
 * @param name The command name.
 * @param path The command path.
 * @returns The newly created command.
 */
function createNewCommand(
  command: string,
  name: string,
  path: string,
  parameters: string[]
): Command {
  const newCommand: Command = {
    command: command.trim(),
    name: name.trim().length !== 0 ? name.trim() : command,
    path: path.trim().length !== 0 ? path.trim() : DEFAULT_PATH,
    parameters: parameters,
  };

  return newCommand;
}

/**
 * Show the three input boxes to decide the command, name and path of the new
 * command. If all three are chosen, create the new command and update Visual
 * Studio Code configuration.
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

  const parameters: string[] = [];
  let parameter = await window.showInputBox(parameterInputBox(1));
  while (parameter?.trim()) {
    parameters.push(parameter.trim());
    parameter = await window.showInputBox(
      parameterInputBox(parameters.length + 1)
    );
  }
  if (parameter === undefined) {
    return;
  }

  const newCommand = createNewCommand(command, name, path, parameters);
  updateConfiguration(newCommand);
}
