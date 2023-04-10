import { ExtensionContext, StatusBarAlignment, commands, window } from "vscode";
import { getCommands } from "./configuration";
import { showCommandPicker } from "./picker";
import { executeCommand } from "./terminal";
import { addNewCommand } from "./command-manger";
import { ADD_NEW_COMMAND, COMMAND_NAME, STATUS_BAR_NAME } from "./constants";

/**
 * Show the command picker.
 * If a command is picked, execute it.
 */
async function runCommand() {
  const commands = getCommands();
  const pickedCommand = await showCommandPicker(commands);

  if (pickedCommand?.command === ADD_NEW_COMMAND) {
    await addNewCommand();
  } else if (pickedCommand) {
    executeCommand(pickedCommand);
  }
}

/**
 * Add this extension to VSCode command palette.
 * @param context VSCode context.
 */
function addCommand(context: ExtensionContext) {
  const commandRunner = commands.registerCommand(COMMAND_NAME, runCommand);

  context.subscriptions.push(commandRunner);
}

/**
 * Add this extension to VSCode status bar.
 * @param context VSCode context.
 */
function addStatusBarItem(context: ExtensionContext) {
  const statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);

  statusBarItem.command = COMMAND_NAME;
  statusBarItem.text = STATUS_BAR_NAME;
  context.subscriptions.push(statusBarItem);
  statusBarItem.show();
}

/**
 * Add this extension to VSCode.
 * @param context VSCode context.
 */
export function activate(context: ExtensionContext) {
  addCommand(context);
  addStatusBarItem(context);
}
