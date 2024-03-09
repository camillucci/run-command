import { InputBoxOptions } from "vscode";
import { DEFAULT_PATH } from "./constants";

/**
 * Return a custom input box for inserting a new command.
 * @param title The title of the input box.
 * @param prompt The text to display underneath the input box.
 * @param placeHolder A placeholder in the input box.
 * @param value The value to pre-fill in the input box.
 * @returns
 */
function inputBox(
  title: string,
  prompt: string,
  placeHolder: string,
  value?: string
): InputBoxOptions {
  return {
    title: title,
    prompt: prompt,
    placeHolder: placeHolder,
    value: value,
  };
}

/**
 * Return the input box for the `command.command`.
 * @returns The input box for the `command.command`.
 */
export function commandInputBox(): InputBoxOptions {
  return inputBox("Command", "Command", "Command");
}

/**
 * Returns the input box for the `command.name`.
 * @param defaultNameValue The default value to pre-fill in the input box.
 * @returns The input box for the `command.name`.
 */
export function nameInputBox(defaultNameValue: string): InputBoxOptions {
  return inputBox(
    "Name",
    "Name of the command",
    "Name of the command",
    defaultNameValue
  );
}

/**
 * Returns the input box for the `command.path`.
 * @returns The input box for the `command.path`.
 */
export function pathInputBox(): InputBoxOptions {
  return inputBox("Path", "Execution Path", "Execution Path", DEFAULT_PATH);
}

/**
 * Returns the input box for one of the `command.parameters`.
 * @param index The number of the current parameter.
 * @returns The input box for one of the `command.parameters`.
 */
export function parameterInputBox(index: number): InputBoxOptions {
  if (index === 1) {
    return inputBox(
      `Parameter${index}`,
      `Parameter${index} name, leave empty for no parameters`,
      `Parameter${index}`
    );
  }

  return inputBox(
    `Parameter${index}`,
    `Parameter${index} name, leave empty to end parameter list`,
    `Parameter${index}`
  );
}

/**
 * Returns the input box for one of the `command.parameters`.
 * @param index The number of the current parameter.
 * @returns The input box for one of the `command.parameters`.
 */
export function valueInputBox(parameter: string): InputBoxOptions {
  return inputBox(
    `${parameter}`,
    `${parameter} value`,
    `${parameter}`
  );
}
