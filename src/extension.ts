import * as vscode from "vscode";
import { getCommands } from "./configuration";
import { showCommandsPick } from "./pick";
import { executeCommand } from "./terminal";
import { addNewCommand } from "./manager";

const COMMAND_NAME: string = "run-command.run-command";
const STATUS_BAR_NAME: string = "$(terminal-view-icon) Run";

export function activate(context: vscode.ExtensionContext) {
  addCommand(context);
  addStatusBarItem(context);
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

async function runCommand() {
  const commands = getCommands();
  const pickedCommand = await showCommandsPick(commands);

  if (pickedCommand?.command === "") {
    await addNewCommand();
  } else if (pickedCommand) {
    executeCommand(pickedCommand);
  }
}
