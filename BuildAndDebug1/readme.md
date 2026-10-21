# Simple executable

- open this folder in VsCode
- make sure it builds from terminal and remember the command line; e.g. `g++ src/*`
- use the above command line in `.vscode/tasks.json` (adapt it to tasks.json syntax)
- go to "Run & Debug" (Ctrl+Shift+D) and create `.vscode/launch.json` with an entry for gdb launch
- in `.vscode/launch.json` set the program you want to debug; e.g. `"program": "${workspaceFolder}/a.out"`

## Build
- `Ctrl+Shift+B` then select your task from the list that appears (it will have the same name as the `"label"` set in `tasks.json`)
    - build active file
    - build all from `src` subdir

## Debug
- set a breakpoint in source code
- `F5` or `Ctrl+Shift+D -> "Start Debugging"`
- watch the `Output`, `Debug Console` and `Terminal`