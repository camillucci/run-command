import * as vscode from "vscode";
import { Command } from './command';

export function getCommands(): Command[] {
    return sanitizeConfiguration(getConfiguration());
}

function getConfiguration(): unknown {
    return vscode.workspace.getConfiguration().get('my-command-runner.commands');
}

function sanitizeConfiguration(configuration: any): Command[] {
    if (!Array.isArray(configuration)) {
        vscode.window.showWarningMessage("my-command-runner.commands property must be an array of commands");
        return [];
    }

    return configuration
        .filter(command => isNotEmptyString((command as Command).command))
        .map<Command>((maybeCommand) => {
            const command = maybeCommand as Command;
            return {
                command: command.command,
                name: notEmptyStringOrUndefined(maybeCommand.name),
                path: notEmptyStringOrUndefined(command.path)
            };
        });
}

function isNotEmptyString(value: any): boolean {
    return typeof value === 'string' && value.trim().length > 0;
}

function notEmptyStringOrUndefined(value: any): string | undefined {
    return isNotEmptyString(value) ? (value as string).trim() : undefined;
}