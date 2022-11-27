import * as vscode from "vscode";
import { Command } from "./command";
import { updateConfiguration } from "./configuration";
import { DEFAULT_PATH } from "./constants";

/**
 * Return a custom input box for inserting a new command.
 * @param title The title of the input box.
 * @param prompt The text to display underneath the input box.
 * @param placeHolder A placeholder in the input box.
 * @param value The value to pre-fill in the input box.
 * @returns
 */
function inputBox(
  title: string,
  prompt: string,
  placeHolder: string,
  value?: string
): vscode.InputBoxOptions {
  return {
    title: title,
    prompt: prompt,
    placeHolder: placeHolder,
    value: value,
  };
}

/**
 * Return the input box for the `command.command`.
 * @returns The input box for the `command.command`.
 */
function commandInputBox(): vscode.InputBoxOptions {
  return inputBox("Command", "Command", "Command");
}

/**
 * Returns the input box for the `command.name`.
 * @param defaultNameValue The default value to pre-fill in the input box.
 * @returns The input box for the `command.name`.
 */
function nameInputBox(defaultNameValue: string): vscode.InputBoxOptions {
  return inputBox("Name", "Name", "Name", defaultNameValue);
}

/**
 * Returns the input box for the `command.path`.
 * @returns The input box for the `command.path`.
 */
function pathInputBox(): vscode.InputBoxOptions {
  return inputBox("Path", "Path", "Path", DEFAULT_PATH);
}

/**
 * Create a new command.
 * @param command The command command.
 * @param name The command name.
 * @param path The command path.
 * @returns The newly created command.
 */
function createNewCommand(command: string, name: string, path: string) {
  const newCommand: Command = {
    command: command.trim(),
    name: name.trim().length !== 0 ? name.trim() : command,
    path: path.trim().length !== 0 ? path.trim() : DEFAULT_PATH,
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
  const command = await vscode.window.showInputBox(commandInputBox());
  if (command === undefined || command.trim().length === 0) {
    return;
  }

  const name = await vscode.window.showInputBox(nameInputBox(command));
  if (!name) {
    return;
  }

  const path = await vscode.window.showInputBox(pathInputBox());
  if (!path) {
    return;
  }

  const newCommand = createNewCommand(command, name, path);
  updateConfiguration(newCommand);
}
