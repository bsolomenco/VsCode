# VisualStudio Code Extension: DefaultDir

## Install
- one of the following:
    - `cp DefaultDir ~/.vscode/extensions/local.DefaultDir`
    - `ln --symbolic ~/prj/VsCode/DefaultDir/ ~/.vscode/extensions/local.DefaultDir`
- restart VsCode
- should display a notification about extension changes -> reload extensions (and optionally restart VsCode)
- check if it appears in Extensions (`Ctrls+Shif+X`)

## Functionality
- right-click on a subdir -> "DefaultDir: set as default dir"
    - => decorated dir in Explorer panel: colored + "DD" badge
    - => name of the selected dir on status bar
- right-click on a subdir -> "DefaultDir: clear default dir" (available only when a default dir was set)
    - => default dir cleared
- functions:
    - `DefaultdDir.set`     set the default dir
    - `DefaultdDir.abs`     get the absolute path for the default dir
    - `DefaultdDir.rel`     get the relative path for the default dir
    - `DefaultdDir.name`    get the name for the default dir

## Usage
- can be used in `tasks.json` & `launch.json` like `${command:DefaultDir.name}`
