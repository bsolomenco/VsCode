# VisualStudio Code related

## Prereqs
- extension to provide `selectedDir`
- tasks.json

## Build Input Dir
- `Ctrl+Shift+B` then select your task from the list that appears (it will have the same name as the `"label"` set in `tasks.json`)
- provide input dir and binary dir

## Build Selected Dir
- select a directory in VsCode's Explorer panel and one of the following:
    - `Ctrl+Shift+B`
    - right-click on a dir then select context menu -> "Run Task for Selected Directory..."
- then select your task from the list that appears

## Debug
- set a breakpoint in your source code
- `F5` or `Ctrl+Shift+D -> "Start Debugging"`
- watch the `Output`, `Debug Console` and `Terminal`