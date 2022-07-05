import * as vscode from "vscode";
import { Command } from "./command";

const CONFIGURATION_NAME: string = "run-command.commands";

export function getCommands(): Command[] {
  return sanitizeConfiguration(getConfiguration());
}

function getConfiguration(): unknown {
  return vscode.workspace.getConfiguration().get(CONFIGURATION_NAME);
}

function sanitizeConfiguration(configuration: any): Command[] {
  if (!Array.isArray(configuration)) {
    vscode.window.showWarningMessage(
      "run-command.commands property must be an array of commands"
    );
    return [];
  }

  return configurationList(configuration);
}

function configurationList(configuration: any[]): Command[] {
  return configuration
    .filter((command) => isNotEmptyString((command as Command).command))
    .map<Command>((maybeCommand) => {
      const command = maybeCommand as Command;
      return {
        command: command.command,
        name: notEmptyStringOrUndefined(maybeCommand.name),
        path: notEmptyStringOrUndefined(command.path),
      };
    });
}

function isNotEmptyString(value: any): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function notEmptyStringOrUndefined(value: any): string | undefined {
  return isNotEmptyString(value) ? (value as string).trim() : undefined;
}
