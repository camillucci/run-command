import { InputBoxOptions } from "vscode";
import { DEFAULT_PATH } from "./constants";

/**
 * Return the input box for the `command.command`.
 * @returns The input box for the `command.command`.
 */
export function commandInputBox(): InputBoxOptions {
  return { title: "Command", placeHolder: "Command", prompt: "Command" };
}

/**
 * Returns the input box for the `command.name`.
 * @param defaultNameValue The default value to pre-fill in the input box.
 * @returns The input box for the `command.name`.
 */
export function nameInputBox(defaultNameValue: string): InputBoxOptions {
  return {
    title: "Name",
    placeHolder: "Name",
    prompt: "Name of the command",
    value: defaultNameValue,
  };
}

/**
 * Returns the input box for the `command.path`.
 * @returns The input box for the `command.path`.
 */
export function pathInputBox(): InputBoxOptions {
  return {
    title: "Path",
    placeHolder: "Path",
    prompt: "Execution Path",
    value: DEFAULT_PATH,
  };
}

/**
 * Returns the input box for one of the `command.parameters`.
 * @param index The number of the current parameter.
 * @returns The input box for one of the `command.parameters`.
 */
export function parameterInputBox(index: number): InputBoxOptions {
  const promptMessage =
    index === 1
      ? `Parameter${index} name, leave empty for no parameters`
      : `Parameter${index} name, leave empty to end parameter list`;

  return {
    title: `Parameter${index}`,
    placeHolder: `Parameter${index}`,
    prompt: promptMessage,
  };
}

/**
 * Returns the input box for one of the `command.parameters`.
 * @param index The number of the current parameter.
 * @returns The input box for one of the `command.parameters`.
 */
export function valueInputBox(parameter: string): InputBoxOptions {
  return {
    title: `${parameter}`,
    placeHolder: `${parameter}`,
    prompt: `${parameter} value`,
  };
}
