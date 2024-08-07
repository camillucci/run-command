# Run Command VS Code Extension

This extension allows to create and run any command on the terminal.

It can be downloaded from [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=camillucci.command-run).
For any bug or feature request, feel free to create an issue on [GitHub](https://github.com/camillucci/run-command).

## Features

Create new commands with the `Add new command...` option in the `Run Command...` menu.

Run commands from the `Run Command...` menu. A new terminal is created for each different command, which is then reutilized.

The `Run Command...` menu can be found in both the Command Palette and the Status Bar.

The configuration of commands can be modified inside the VS Code `settings.json` file.

## Extension Settings

This extension contributes the following settings:

- `run-command.commands`: list of all commands with the following parameters:
  - `command`: shell code to be executed.
  - `name`: optional name of the command.
  - `path`: optional starting path of the terminal.
  - `parameters`: optional list of parameter to be specified by the user when running the command.

## Examples

- Basic command that will run on the workspace folder:

  ```json
  {
      "command": "npm install"
  }
  ```

- Command with a custom name that will run on the specified folder:

  ```json
  {
      "command": "npm install",
      "name": "Install node modules",
      "path": "${workspaceFolder}/src"
  }
  ```

- Command with parameters that will be replaced when the command is run:

  ```json
  {
      "command": "npm install newModuleName",
      "name": "Install new node module",
      "path": "${workspaceFolder}/src",
      "parameters": [
          "newModuleName"
      ]
  }
  ```
