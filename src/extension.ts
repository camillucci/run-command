import * as vscode from "vscode";
import { getCommands } from "./configuration";
import { showCommandsPick } from "./pick";
import { executeCommand } from "./terminal";

const commandName = "run-command.run-command";
const statusBarName = "$(terminal-view-icon) Run";

export function activate(context: vscode.ExtensionContext) {
  addCommand(context);
  addStatusBarItem(context);
}

function addCommand(context: vscode.ExtensionContext) {
  const commandRunner = vscode.commands.registerCommand(
    commandName,
    runCommand
  );

  context.subscriptions.push(commandRunner);
}

function addStatusBarItem(context: vscode.ExtensionContext) {
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left
  );

  statusBarItem.command = commandName;
  statusBarItem.text = statusBarName;
  context.subscriptions.push(statusBarItem);
  statusBarItem.show();
}

async function runCommand() {
  const commands = getCommands();
  const pickedCommand = await showCommandsPick(commands);

  if (pickedCommand) {
    executeCommand(pickedCommand);
  }
}
