# run-command README

This extension allows to create and run any command on the terminal.

The `Run Command...` menu can be found in the Command Palette and in the Status Bar.

## Features

Create new commands with the `Add new command...` option in the `Run Command...` menu.

Run commands from the `Run Command...` menu. A new terminal is spawn for each different command, which are then reutilized.

The configuration of commands can be modified in the vscode `settings.json` file.

## Extension Settings

This extension contributes the following settings:

- `run-command.commands`: list of all commands with the following parameters:
  - `command`: shell code to be executed
  - `name`: optional name of the command
  - `path`: optional path at which the terminal is created
