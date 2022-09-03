import * as vscode from "vscode";
import { Command } from "./command";
import { CONFIGURATION_NAME } from "./constants";

function isNotEmptyString(value: any): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function notEmptyStringOrUndefined(value: any): string | undefined {
  return isNotEmptyString(value) ? (value as string).trim() : undefined;
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

function getConfiguration(): Command[] {
  const config = vscode.workspace.getConfiguration().get(CONFIGURATION_NAME);

  if (!Array.isArray(config)) {
    vscode.window.showWarningMessage("The commands property must be an array");
    return [];
  }

  return configurationList(config);
}

export function getCommands(): Command[] {
  return getConfiguration();
}

export async function updateConfiguration(newCommand: Command): Promise<void> {
  const commands = getCommands();
  commands.push(newCommand);

  await vscode.workspace
    .getConfiguration()
    .update(CONFIGURATION_NAME, commands);
}
