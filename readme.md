# VisualStudio Code related

## BuildAndDebug
- how to build a simple executable in VsCode (it has its own readme)

## Prereqs
- extension to provide `DefaultDir`
- tasks.json
- launch.json

## Build Input Dir
- `Ctrl+Shift+B` then select your task from the list that appears (it will have the same name as the `"label"` set in `tasks.json`)
- provide input dir and binary dir

## Build Default Selected Dir
- select a directory in VsCode's Explorer panel then one of the following:
    - `Ctrl+Shift+B`
    - ToDo: right-click on a dir then select context menu -> "Run Task for  Directory..."
- then select your task from the list that appears

## Debug
- set a breakpoint in your source code
- `F5` or `Ctrl+Shift+D -> "Start Debugging"`
- watch the `Output`, `Debug Console` and `Terminal`