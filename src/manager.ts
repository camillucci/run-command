import * as vscode from "vscode";
import { Command } from "./command";
import { getCommands } from "./configuration";

const CONFIGURATION_NAME: string = "run-command.commands";
const DEFAULT_PATH: string = "${workspaceFolder}";

const COMMAND_INPUT_BOX: vscode.InputBoxOptions = {
  title: "Command",
  prompt: "Command",
  placeHolder: "Command",
};

const NAME_INPUT_BOX: vscode.InputBoxOptions = {
  title: "Name",
  prompt: "Name",
  placeHolder: "Name",
};

const PATH_INPUT_BOX: vscode.InputBoxOptions = {
  title: "Path",
  prompt: "Path",
  placeHolder: "Path",
  value: DEFAULT_PATH,
};

export async function addNewCommand(): Promise<void> {
  const command = await vscode.window.showInputBox(COMMAND_INPUT_BOX);

  if (command === undefined || command.trim().length === 0) {
    return;
  }

  const name = await vscode.window.showInputBox(NAME_INPUT_BOX);

  if (!name) {
    return;
  }

  const path = await vscode.window.showInputBox(PATH_INPUT_BOX);

  if (!path) {
    return;
  }

  updateConfiguration(createNewCommand(command, name, path));
}

function createNewCommand(
  command: string,
  name: string,
  path: string
): Command {
  return {
    command: command,
    name: name.trim().length !== 0 ? name : command,
    path: path.trim().length !== 0 ? path : DEFAULT_PATH,
  };
}

async function updateConfiguration(newCommand: Command): Promise<void> {
  const commands = getCommands();
  commands.push(newCommand);
  await vscode.workspace
    .getConfiguration()
    .update(CONFIGURATION_NAME, commands);
}
