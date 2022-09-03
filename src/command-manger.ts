import * as vscode from "vscode";
import { Command } from "./command";
import { updateConfiguration } from "./configuration";
import { DEFAULT_PATH } from "./constants";

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

function commandInputBox(): vscode.InputBoxOptions {
  return inputBox("Command", "Command", "Command");
}

function nameInputBox(defaultNameValue: string): vscode.InputBoxOptions {
  return inputBox("Name", "Name", "Name", defaultNameValue);
}

function pathInputBox(): vscode.InputBoxOptions {
  return inputBox("Command", "Command", "Command", DEFAULT_PATH);
}

function createNewCommand(command: string, name: string, path: string) {
  const newCommand: Command = {
    command: command.trim(),
    name: name.trim().length !== 0 ? name.trim() : command,
    path: path.trim().length !== 0 ? path.trim() : DEFAULT_PATH,
  };

  return newCommand;
}

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
