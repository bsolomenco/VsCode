const vscode = require('vscode');
const path = require('path');

/** @type {vscode.Uri | undefined} */
let defaultUri;
/** @type {string | undefined} path relative to its workspace folder, '/' separators */
let defaultRel;

function activate(context) {
    const log = vscode.window.createOutputChannel('DefaultDir', { log: true });
    log.info('DefaultDir activate()...');
    const decoEmitter = new vscode.EventEmitter();

    const status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    status.text = '$(folder) (none)';
    status.tooltip = 'DefaultDir: current default directory';
    status.color = new vscode.ThemeColor('DefaultDir.foreground');
    //status.show();//show only when is a subdir selected (otherwise takes up space in the status bar for no reason)
    vscode.commands.executeCommand('setContext', 'DefaultDir.hasDefault', false);

    const decoProvider = {
        onDidChangeFileDecorations: decoEmitter.event,
        provideFileDecoration(uri) {
            if (defaultUri && uri.toString() === defaultUri.toString()) {
                return new vscode.FileDecoration(
                    'DD',//new vscode.ThemeIcon('folder-active'),
                    'DD = Default Directory',
                    new vscode.ThemeColor('DefaultDir.foreground')
                );
            }
            return undefined;
        }
    };

    context.subscriptions.push(
        log,
        decoEmitter,
        vscode.window.registerFileDecorationProvider(decoProvider),

        vscode.commands.registerCommand('DefaultDir.set', (uri) => {
            if (!(uri instanceof vscode.Uri)) {
                return;
            }
            const folder = vscode.workspace.getWorkspaceFolder(uri);
            if (!folder) {
                vscode.window.showWarningMessage('DefaultDir: folder is not inside a workspace.');
                return;
            }
            //const rel = path.relative(folder.uri.fsPath, uri.fsPath).split(path.sep).join('/');
            const rel = vscode.workspace.asRelativePath(uri, false);//path.relative(workspaceFolder.uri.fsPath, uri.fsPath);
            if (!rel) {
                vscode.window.showWarningMessage('DefaultDir: select a subdirectory, not the workspace root.');
                return;
            }
            if (defaultUri && defaultUri.toString() === uri.toString()) {
                return; // unchanged
            }

            const previous = defaultRel;
            const previousUri = defaultUri;
            defaultUri = uri;
            defaultRel = rel;
            status.text = `$(folder-active) ${rel}`;
            status.tooltip = 'DefaultDir: current default directory\ndir='+(defaultUri?path.basename(defaultUri.fsPath):'') + '\nrel='+rel + '\nabs='+uri.fsPath;
            status.show();
            vscode.commands.executeCommand('setContext', 'DefaultDir.hasDefault', true);

            log.info(`Default dir changed: ${previous ?? '(none)'} -> ${rel}`);

            const changed = [uri];
            if (previousUri) {
                changed.push(previousUri);
            }
            decoEmitter.fire(changed);
        }),

        // For use in tasks.json & launch.json like:  ${command:DefaultDir.abs}
        vscode.commands.registerCommand('DefaultDir.rel'    , () => defaultRel ?? '.'),
        vscode.commands.registerCommand('DefaultDir.abs'    , () => defaultUri ? defaultUri.fsPath : undefined),
        vscode.commands.registerCommand('DefaultDir.name'   , () => defaultUri ? path.basename(defaultUri.fsPath) : undefined),
        vscode.commands.registerCommand('DefaultDir.clr'    , () => {
            log.info('DefaultDir.clr()...');
            if (!defaultUri) {
                return;
            }
            const previous = defaultRel;
            const previousUri = defaultUri;
            defaultUri = undefined;
            defaultRel = undefined;
            status.text = '$(folder) (none)';
            status.tooltip = 'DefaultDir: current default directory';
            status.hide();

            vscode.commands.executeCommand('setContext', 'DefaultDir.hasDefault', false);
            decoEmitter.fire([previousUri]);
            log.info(`Default dir cleared: ${previous ?? '(none)'} -> (none)`);
        })
    );

    log.info('DefaultDir activate().');
}

function deactivate() {}

module.exports = { activate, deactivate };