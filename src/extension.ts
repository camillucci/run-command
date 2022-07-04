import * as vscode from 'vscode';
import { getCommands } from './configuration';
import { showCommandsPick } from './pick';
import { executeCommand } from './terminal';

export function activate(context: vscode.ExtensionContext) {
	let commandRunner = vscode.commands.registerCommand('command-runner.run-command', runCommand);
	context.subscriptions.push(commandRunner);
}

async function runCommand() {
	const commands = getCommands();

	const pickedCommand = await showCommandsPick(commands);

	if (!pickedCommand) {
		return;
	}

	executeCommand(pickedCommand);
}

export function deactivate() {
	const commandNames = getCommands().map(command => {
		return command.name;
	});

	for (const terminal of vscode.window.terminals) {
		if (commandNames.includes(terminal.name)) {
			terminal.dispose();
		}
	}
}
