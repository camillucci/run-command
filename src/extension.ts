import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('command-runner.run-command', () => {
		vscode.window.showInformationMessage('Hello World from Command Runner!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {
	// TODO: Clean up function: close all opened terminals.
}
