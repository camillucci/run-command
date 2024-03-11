import { DEFAULT_PATH } from "./constants";

export interface Command {
  command: string;
  name?: string;
  path?: string;
  parameters?: string[];
}

/**
 * Returns a new command stripped of all default values.
 * @param command The command to clean from default values.
 * @returns The cleaned command.
 */
export function cleanCommand(command: Command): Command {
  return {
    command: command.command,
    name: command.name !== command.command ? command.name : undefined,
    path: command.path !== DEFAULT_PATH ? command.path : undefined,
    parameters:
      command.parameters?.length !== 0 ? command.parameters : undefined,
  };
}
