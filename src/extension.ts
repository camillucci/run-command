import * as vscode from "vscode";
import { getCommands } from "./configuration";
import { showCommandPicker } from "./picker";
import { executeCommand } from "./terminal";
import { addNewCommand } from "./command-manger";
import { ADD_NEW_COMMAND, COMMAND_NAME, STATUS_BAR_NAME } from "./constants";

async function runCommand() {
  const commands = getCommands();
  const pickedCommand = await showCommandPicker(commands);

  if (pickedCommand?.command === ADD_NEW_COMMAND) {
    await addNewCommand();
  } else if (pickedCommand) {
    executeCommand(pickedCommand);
  }
}

function addCommand(context: vscode.ExtensionContext) {
  const commandRunner = vscode.commands.registerCommand(
    COMMAND_NAME,
    runCommand
  );

  context.subscriptions.push(commandRunner);
}

function addStatusBarItem(context: vscode.ExtensionContext) {
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left
  );

  statusBarItem.command = COMMAND_NAME;
  statusBarItem.text = STATUS_BAR_NAME;
  context.subscriptions.push(statusBarItem);
  statusBarItem.show();
}

export function activate(context: vscode.ExtensionContext) {
  addCommand(context);
  addStatusBarItem(context);
}
