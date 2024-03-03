import { window, workspace } from "vscode";
import { Command } from "./command";
import { CONFIGURATION_NAME } from "./constants";

/**
 * Check if an object is a non empty string.
 * @param value The object to check.
 * @returns If the given object is a non empty string.
 */
function isNotEmptyString(value: any): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Get the given string trimmed, or undefined if not possible.
 * @param value The string to check and trim.
 * @returns The trimmed given string or undefined.
 */
function notEmptyStringOrUndefined(value: any): string | undefined {
  return isNotEmptyString(value) ? (value as string).trim() : undefined;
}

/**
 * Get the given list with trimmed parameters, or undefined if not possible.
 * @param value The array to check and trim.
 * @returns The trimmed given list or undefined.
 */
function notEmptyArrayOrUndefined(value: any): string[] | undefined {
  return Array.isArray(value)
    ? value.filter((val) => notEmptyStringOrUndefined(val))
    : undefined;
}

/**
 * Get all available commands from the VSCode configuration.
 * @param configuration VSCode configuration of this extension.
 * @returns The list of available commands.
 */
function configurationList(configuration: any[]): Command[] {
  return configuration
    .filter((command) => isNotEmptyString((command as Command).command))
    .map<Command>((maybeCommand) => {
      const command = maybeCommand as Command;
      return {
        command: command.command,
        name: notEmptyStringOrUndefined(command.name),
        path: notEmptyStringOrUndefined(command.path),
        parameters: notEmptyArrayOrUndefined(command.parameters),
      };
    });
}

/**
 * Get all available commands from VSCode workspace `settings.json` file.
 * @returns The list of available commands.
 */
export function getCommands(): Command[] {
  const config = workspace.getConfiguration().get(CONFIGURATION_NAME);

  if (!Array.isArray(config)) {
    window.showWarningMessage("The commands property must be an array");
    return [];
  }

  return configurationList(config);
}

/**
 * Given a new command, insert it into VSCode `settings.json` file.
 * @param newCommand The new command to insert.
 */
export async function updateConfiguration(newCommand: Command): Promise<void> {
  const commands = getCommands();
  commands.push(newCommand);

  await workspace.getConfiguration().update(CONFIGURATION_NAME, commands);
}
